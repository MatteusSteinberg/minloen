import { Types } from "mongoose"

type fileType = "image" | "video" | "audio" | "document" | "other"

export interface IFile {
  id?: any
  organization?: Types.ObjectId
  key: string
  contentType: string
  fileType: fileType
  updatedAt?: Date
  createdAt?: Date
}
