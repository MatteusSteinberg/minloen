import { Schema, model } from "mongoose"
import { IDriving } from "../../interfaces/driving.interface"

const drivingSchema = new Schema<IDriving>(
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
        locationFrom: {
            type: String,
            required: true,
        },
        locationTo: {
            type: String,
            required: true,
        },
        licensePlate: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        roundtrip: {
            type: Boolean,
            default: false,
        },
        date: {
            type: Date,
            required: true,
        },
        distance: {
            type: Number,
            required: true,
        },
        compensation: {
            type: Number,
            required: true,
        },
    },
    {
        timestamps: true,
    }
)

const drivingModel = model<IDriving>("Driving", drivingSchema)

export default drivingModel
