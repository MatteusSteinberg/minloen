import _ from "lodash"
import { HydratedDocument, Types } from "mongoose"
import { IPayrollSetup } from "../../../interfaces/payroll.interface"
import { IUser } from "../../../interfaces/user.interface"
import payrollSetupModel from "../../models/payroll-setup.model"


export default class Payroll {
  public payrollSetup: HydratedDocument<IPayrollSetup>
  payrollSetupId: string
  public user: HydratedDocument<IUser>

  constructor(user: HydratedDocument<IUser>, payrollSetupId?: string) {
    this.user = user
    if (payrollSetupId) {
      this.payrollSetupId = payrollSetupId
    }
  }

  private async setup() {
    if (!this.payrollSetup && this.payrollSetupId) {
      this.payrollSetup = await payrollSetupModel.findOne({
        _id: new Types.ObjectId(this.payrollSetupId),
      })
    }
  }

  public async load() {
    await this.setup()
  }

  public async getter() {
    await this.setup()
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

  public async create(setup: IPayrollSetup, createdBy: HydratedDocument<IUser>) {
    if (createdBy.organizationRole === "admin") {
      this.payrollSetup = await payrollSetupModel.create({
        ...setup,
        organization: createdBy.activeOrganization,
        createdBy: createdBy._id
      })
      this.payrollSetupId = this.payrollSetup.id
    }
  }

  public async update(setup: Partial<IPayrollSetup>, updatedBy: HydratedDocument<IUser>) {
    await this.setup()
    if (updatedBy.organizationRole === "admin") {
      this.payrollSetup = _.merge(this.payrollSetup, setup)
      this.payrollSetup.createdBy = updatedBy._id
      await this.payrollSetup.save({ validateModifiedOnly: true })
    }
  }
} 
