import { Schema, model } from "mongoose"
import { IPayroll } from "../../interfaces/payroll.interface"

const payrollSchema = new Schema<IPayroll>(
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
    payrollSetup: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "PayrollSetup"
    },
    payrollSetupAtGeneration: {
      type: {},
      required: true,
    },
    dateFrom: {
      type: Date,
      required: true,
      index: true
    },
    dateTo: {
      type: Date,
      required: true,
    },
    pdf: {
      type: {},
      required: true
    }
  },
  {
    timestamps: true,
  }
)

const payrollModel = model<IPayroll>("Payroll", payrollSchema)

export default payrollModel
