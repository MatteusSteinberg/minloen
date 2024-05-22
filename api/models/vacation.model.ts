import { Schema, model } from "mongoose"
import { IVacation } from "../../interfaces/vacation.interface"

const vacationSchema = new Schema<IVacation>(
  {
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    type: {
      type: String,
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
  },
  {
    timestamps: true,
  }
)

const vacationModel = model<IVacation>("Vacation", vacationSchema)

export default vacationModel
