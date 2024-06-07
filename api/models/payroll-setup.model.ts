import { Schema, model } from "mongoose"
import { IPayrollSetup } from "../../interfaces/payroll.interface"

const payrollSchema = new Schema<IPayrollSetup>(
  {
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    organization: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Organization"
    },
    benefits: {
      type: {},
      required: false
    },
    fixed: {
      type: Boolean,
      required: false
    },
    supplements: {
      type: [],
      required: false
    },
    deduction: {
      type: [],
      required: false
    },
    wageInfo: {
      type: {}
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    }
  },
  {
    timestamps: true,
  }
)

const payrollSetupModel = model<IPayrollSetup>("PayrollSetup", payrollSchema)

export default payrollSetupModel
