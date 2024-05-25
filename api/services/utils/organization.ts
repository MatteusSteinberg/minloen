import _ from "lodash"
import { HydratedDocument } from "mongoose"
import { IOrganization } from "../../../interfaces/organization.interface"
import { IUserAdd } from "../../../interfaces/user.interface"
import organizationModel from "../../models/organization.model"

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
  }

}