import { Schema, model } from "mongoose"
import { IFile } from "../../interfaces/file.interface"

const fileSchema = new Schema<IFile>(
  {
    key: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    file_type: {
      type: String,
      enum: ["image", "video", "audio", "document", "other"],
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

const fileModel = model<IFile>("File", fileSchema)

export default fileModel
