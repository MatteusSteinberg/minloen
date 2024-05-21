import { Schema, model } from "mongoose"
import { IPayroll } from "../interfaces/payroll.interface"

const payrollSchema = new Schema<IPayroll>(
  {
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    preTaxAmount: {
      type: Number,
      required: true,
    },
    afterTaxAmount: {
      type: Number,
      required: true,
    },
    dateFrom: {
      type: Date,
      required: true,
    },
    dateTo: {
      type: Date,
      required: true,
    },
    files: {
      type: [Schema.Types.ObjectId],
      required: true,
      ref: "File",
    },
  },
  {
    timestamps: true,
  }
)

const payrollModel = model<IPayroll>("Payroll", payrollSchema)

export default payrollModel
