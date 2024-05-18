import { Schema, model } from "mongoose";
import { IOrganization } from "../interfaces/organization.interface";

const organizationSchema = new Schema<IOrganization>(
  {
    name: {
      type: String,
      trim: true,
      index: true,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const organizationModel = model<IOrganization>(
  "Organization",
  organizationSchema
);

export default organizationModel;
