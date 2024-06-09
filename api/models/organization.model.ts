import { Schema, model } from "mongoose"
import { IOrganization } from "../../interfaces/organization.interface"

const organizationSchema = new Schema<IOrganization>(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    cvr: {
      type: String,
      trim: true,
      required: true,
      unique: true
    },
    address: {
      type: String,
      required: false
    },
    zipCode: {
      type: String,
      required: false
    },
    active: {
      type: Boolean,
      required: true,
      default: true
    },
  },
  {
    timestamps: true,
  }
)

const organizationModel = model<IOrganization>(
  "Organization",
  organizationSchema
)

export default organizationModel
