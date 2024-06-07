import { HydratedDocument, Types } from "mongoose"
import { IPayrollSetup } from "../../../interfaces/payroll.interface"
import { IUser } from "../../../interfaces/user.interface"
import payrollSetupModel from "../../models/payroll-setup.model"


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
