import { Schema, model } from "mongoose";
import { IDriving } from "../interfaces/driving.interface";

const drivingSchema = new Schema<IDriving>(
  {
    employee: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    from: {
      type: String,
      required: true,
    },
    to: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    distance: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const drivingModel = model<IDriving>("Driving", drivingSchema);

export default drivingModel;
