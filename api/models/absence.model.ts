import { Schema, model } from "mongoose"
import { IAbsence } from "../../interfaces/absence.interface"

const absenceSchema = new Schema<IAbsence>(
    {
        user: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: "User",
        },
        organization: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: "Organization",
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
        description: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
)

const absenceModel = model<IAbsence>("Absence", absenceSchema)

export default absenceModel
