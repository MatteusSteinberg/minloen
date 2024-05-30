import { Schema, model } from "mongoose"
import { IPayroll, IPayrollSetup } from "../../interfaces/payroll.interface"

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
    supplements: {
      type: [String],
      required: false
    },
    wageInfo: {
      type: {
        standardHours: String,
        salaryType: String,
        salary: String,
        hourlyWage: String,
      }
    }
  },
  {
    timestamps: true,
  }
)

const payrollSetupModel = model<IPayroll>("PayrollSetup", payrollSchema)

export default payrollSetupModel
