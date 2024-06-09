import dayjs from "dayjs"
import { HydratedDocument, Types } from "mongoose"
import { IPayrollDetailLine, IPayrollPDF, IPayrollSetup } from "../../../interfaces/payroll.interface"
import { IUser } from "../../../interfaces/user.interface"
import organizationModel from "../../models/organization.model"
import payrollSetupModel from "../../models/payroll-setup.model"
import { pdfMaker } from "../helpers/pdf-generator"

import fs from "fs"

export default class Payroll {
  public payrollSetup: HydratedDocument<IPayrollSetup>
  public user: HydratedDocument<IUser>
  public fixed: boolean = true
  public payrollUser: HydratedDocument<IUser>

  constructor(user: HydratedDocument<IUser>) {
    this.user = user
  }

  private async setup(fixed: boolean = this.fixed, payrollUser: HydratedDocument<IUser> = this.payrollUser) {
    if (!this.payrollSetup) {
      this.payrollSetup = await payrollSetupModel.findOne({
        user: payrollUser._id,
        fixed: { $eq: fixed }
      })
    }
  }

  public async getter(fixed: boolean = this.fixed, payrollUser: HydratedDocument<IUser>) {
    await this.setup(fixed, payrollUser)
    return this.payrollSetup.toObject({ virtuals: true })
  }

  public async getFixed(userId: string) {
    return await payrollSetupModel.findOne({
      organization: this.user.activeOrganization,
      user: new Types.ObjectId(userId),
      fixed: { $eq: true }
    })
  }

  public async getComing(userId: string) {
    return await payrollSetupModel.findOne({
      organization: this.user.activeOrganization,
      user: new Types.ObjectId(userId),
      fixed: { $ne: true },
      hasBeenRolled: { $ne: true }
    })
  }

  public async create(setup: IPayrollSetup, payrollUser: HydratedDocument<IUser>, fixed: boolean = true) {
    if (this.user.organizationRole === "admin") {
      this.payrollSetup = await payrollSetupModel.create({
        ...setup,
        user: payrollUser,
        organization: this.user.activeOrganization,
        createdBy: this.user._id,
        fixed
      })
      this.payrollUser = payrollUser
      this.fixed = fixed
    }
  }

  public async update(setup: Partial<IPayrollSetup>, payrollUser: HydratedDocument<IUser>, fixed: boolean = true) {
    await this.setup(fixed, payrollUser)
    if (this.user.organizationRole === "admin") {
      this.payrollSetup.wageInfo = { ...this.payrollSetup.wageInfo, ...setup.wageInfo }
      this.payrollSetup.benefits = { ...this.payrollSetup.benefits, ...setup.benefits }
      this.payrollSetup.supplements = setup.supplements
      this.payrollSetup.deduction = setup.deduction
      this.payrollSetup.createdBy = this.user._id
      this.user = payrollUser
      await this.payrollSetup.save({ validateModifiedOnly: true })
      this.payrollUser = payrollUser
      this.fixed = fixed
    }
  }
}

const months = {
  0: "Januar",
  1: "Februar",
  2: "Marts",
  3: "April",
  4: "Maj",
  5: "Juni",
  6: "Juli",
  7: "August",
  8: "September",
  9: "Oktober",
  10: "November",
  11: "December"
} as { [key: number]: string }

function handlePayrollDetailsAndSalary(user: HydratedDocument<IUser>, payrollSetup: HydratedDocument<IPayrollSetup>) {
  const details: Array<IPayrollDetailLine> = []
  const salary = user?.salaryType === "salary" ? payrollSetup?.wageInfo?.salary || 0 : (payrollSetup?.wageInfo?.hourlyWage || 0) * (payrollSetup?.wageInfo?.numberOfHours || 0)
  const hours = user.salaryType === "salary" ? user.standardHours : payrollSetup.wageInfo?.numberOfHours
  const hourlyWage = user.salaryType === "salary" ? user.salary : payrollSetup.wageInfo?.hourlyWage
  details.push({
    description: "Løn",
    basis: hours.toFixed(2).toString(),
    rate: hourlyWage.toFixed(2).toString(),
    total: salary.toFixed(2).toString()
  })

  /** Til udbetaling */
  let salaryPayment = salary
  // Tillæg
  let totalSupplements = 0
  for (const supplement of payrollSetup.supplements) {
    details.push({
      description: supplement.name ?? "Unavngivet tillæg",
      total: supplement.value.toFixed(2).toString()
    })
    totalSupplements += supplement.value
  }
  salaryPayment += totalSupplements

  const atp = -99
  details.push({
    description: "ATP af Løn",
    basis: hours.toFixed(2),
    total: atp.toFixed(2)
  })
  salaryPayment = atp + salaryPayment

  const amPension = salaryPayment * 0.02
  details.push({
    description: "AM-pension - Eget bidrag",
    rate: "2%",
    basis: salaryPayment.toFixed(2),
    total: (amPension * -1).toFixed(2)
  })
  salaryPayment -= amPension
  details.push({
    description: "AM-Indkomst",
    basis: salaryPayment.toFixed(2)
  })
  const amContribution = salaryPayment * 0.08
  details.push({
    description: "AM-Bidrag",
    basis: salaryPayment.toFixed(2),
    rate: "8%",
    total: (amContribution * -1).toFixed(2)
  })
  salaryPayment -= amContribution
  const taxDeduction = payrollSetup.wageInfo?.taxDeduction
  const salaryPaymentWithTaxDeduction = salaryPayment - taxDeduction
  const taxPayed = salaryPayment * 0.38
  details.push({
    description: `A-skat (Fradrag: ${taxDeduction.toFixed(2)} DKK)`,
    rate: "38%",
    basis: salaryPaymentWithTaxDeduction.toFixed(2),
    total: taxPayed.toFixed(2)
  })
  salaryPayment -= taxPayed

  return { details, salaryPayment }
}

function lastWorkingDay(date: Date | dayjs.Dayjs) {
  let day = dayjs(date)
  day = day.endOf("month")
  if (day.day() === 0) { // sunday
    day = day.subtract(2, 'days')
  }
  if (day.day() === 6) { // saturday
    day = day.subtract(1, 'days')
  }

  return day
}

export async function generatePayrollPDF(user: HydratedDocument<IUser>, payrollSetup: HydratedDocument<IPayrollSetup>) {
  const organization = await organizationModel.findById(user.activeOrganization)

  const day = dayjs()
  const paymentPeriod = [dayjs(day), dayjs(day)]

  if (user.paymentArrangement === "ahead") {
    paymentPeriod[0] = paymentPeriod[0].add(1, 'month').startOf('month')
    paymentPeriod[1] = paymentPeriod[1].add(1, 'month').endOf('month')
  } else {
    paymentPeriod[0] = paymentPeriod[0].startOf('month')
    paymentPeriod[1] = paymentPeriod[1].endOf('month')
  }

  const paymentDate = lastWorkingDay(day)

  const { details, salaryPayment } = handlePayrollDetailsAndSalary(user, payrollSetup)

  const pdf = await pdfMaker({
    key: "payroll",
    data: {
      employee: {
        address: user.address ?? "Manglende addresse",
        bankAccount: user.bankAccountNumber + " " + user.bankRegistrationNumber,
        cpr: user.socialSecurityNumber,
        employeeNumber: user.workerNumber,
        hiredDate: dayjs(user.employmentDate).format("DD-MM-YYYY"),
        name: user.name,
        zipCode: user.zipCode ?? "Manglende post. nr."
      },
      balance: {
        holidays: [],
        saldi: []
      },
      company: {
        address: organization.address,
        cvr: organization.cvr,
        name: organization.name,
        zipCode: organization.zipCode
      },
      details: details,
      payroll: {
        datePeriod: `${paymentPeriod[0].format("DD-MM-YYYY")} - ${paymentPeriod[1].format("DD-MM-YYYY")}`,
        month: months[paymentPeriod[0].month()],
        paymentDate: paymentDate.format("DD-MM-YYYY"),
        salary: salaryPayment.toFixed(2).toString()
      }
    } as IPayrollPDF
  })

  fs.unlink("./test.pdf", err => { })
  fs.appendFile("./test.pdf", Buffer.from(pdf), (err) => {
    if (err) {
      throw err
    }
  })
}