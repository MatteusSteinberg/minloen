import _ from "lodash"
import { HydratedDocument } from "mongoose"
import { IOrganization } from "../../../interfaces/organization.interface"
import { IUser, IUserAdd } from "../../../interfaces/user.interface"
import organizationModel from "../../models/organization.model"
import userModel from "../../models/user.model"
import { inviteUserEmail } from "./email.utils"

export default class Organization {

  organization: HydratedDocument<IOrganization>
  organizationId: string

  constructor(organizationId?: string) {
    this.organizationId = organizationId
  }

  public async register(name: string, cvr: string) {
    if (!this.organization) {
      this.organization = await organizationModel.create({
        name,
        cvr
      })
      this.organizationId = this.organization._id.toHexString()
    }
  }

  private async setup() {
    if (!this.organization) {
      this.organization = await organizationModel.findById(this.organizationId)
    }
  }

  public async load() {
    await this.setup()
  }

  public async set(path: string | number | symbol, value: any) {
    await this.setup()
    this.organization = _.set(this.organization, path, value)
  }

  public async addUser(user: IUserAdd) {
    await this.setup()

    let newUser: HydratedDocument<IUser>

    if (user.organizationRole === "user") {
      newUser = await userModel.create({
        ...user,
        organizationRole: "user",
        organizations: [this.organization._id],
        activeOrganization: this.organization._id
      })
    }
    else if (user.organizationRole === "admin") {
      newUser = await userModel.create({
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        socialSecurityNumber: user.socialSecurityNumber,
        phoneNumber: user.phoneNumber,
        organizationRole: "admin",
        organizations: [this.organization._id],
        activeOrganization: this.organization._id
      })
    }

    await inviteUserEmail(newUser)

    return newUser
  }

}