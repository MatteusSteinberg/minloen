import { Document, Model, Types } from "mongoose"

export interface IUser {
  id?: any
  name: string
  email: string
  password?: string
  updatedAt?: Date
  createdAt?: Date
  forgottenPassword?: {
    token: string
    createdAt: Date
    expriryAt: Date
    usedAt?: Date
  }
  organization?: any
  organizationRole?: "admin" | "user"
}

export type IUserDoc = IUser & Document

export interface IUserModel extends Model<IUserDoc> {
  isEmailTaken(email: string, excludeUserId?: Types.ObjectId): Promise<boolean>
}
