type fileType = "image" | "video" | "audio" | "document" | "other"

export interface IFile {
  id?: any
  key: string
  type: string
  file_type: fileType
  updatedAt?: Date
  createdAt?: Date
}
