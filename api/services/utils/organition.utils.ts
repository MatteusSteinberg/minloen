import _ from "lodash"
import { HydratedDocument } from "mongoose"
import { IOrganization } from "../../../interfaces/organization.interface"
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

  public async setup() {
    if (!this.organization) {
      this.organization = await organizationModel.findById(this.organizationId)
    }
  }

  public async set(path: string | number | symbol, value: any) {
    this.organization = _.set(this.organization, path, value)
  }
}