import { Types } from "mongoose"

export interface IPayrollSetup {
  id?: any
  user?: Types.ObjectId
  organization?: Types.ObjectId
  wageInfo?: {
    standardHours?: number
    /** Gage */
    salary?: number

    /** Timeløn */
    hourlyWage?: number
    personalAdditions?: number
  }

  benefits?: {
    freeCar?: number
    /** Helårsbolig */
    freeYearRoundResidence?: number
    freeSummerResidence?: number
    freeYacht?: number
    freeMediaAndRadioLicense?: number
    benefitsWithFloor?: number
    benefitsWithoutFloor?: number
    freePhoneAndInternet?: number
    /** Frikort til offentlig befordring */
    freepassForPublicCarriage?: number
    healthInsurance?: number
  }

  supplements?: Array<string>
}

export interface IPayroll {
  id?: any
  user: Types.ObjectId
  organization: Types.ObjectId
  preTaxAmount: number
  afterTaxAmount: number

  dateFrom: Date
  dateTo: Date
  updatedAt?: Date
  createdAt?: Date
  files: Array<Types.ObjectId>
}

export interface IPayrollEmployeeInfo {
  name: string
  address: string
  zipCode: string
  employeeNumber: string
  cpr: string
  hiredDate: string
  bankAccount: string
}

export interface IPayrollCompanyInfo {
  name: string
  address: string
  zipCode: string
  cvr: string
}

export interface IPayrollInfo {
  month: string
  datePeriod: string
  paymentDate: string
  salary: string
}

export interface IPayrollDetailLine {
  description: string
  basis?: string
  rate?: string
  total?: string
}

export interface IPayrollSaldiLine {
  description: string
  value: string
}

export interface IPayrollHolidayLine {
  description: string
  optionOne?: string
  optionTwo?: string
  optionThree?: string
}

export interface IPayrollHoliday {
  description: string
  optionOne?: string
  optionTwo?: string
  optionThree?: string
  holidayLines: Array<IPayrollHolidayLine>
}

export interface IPayrollBalance {
  holidays: Array<IPayrollHoliday>
  saldi: Array<IPayrollSaldiLine>
}

export interface IPayrollPDF {
  employee: IPayrollEmployeeInfo
  company: IPayrollCompanyInfo
  payroll: IPayrollInfo
  details: Array<IPayrollDetailLine>
  balance: IPayrollBalance
}
