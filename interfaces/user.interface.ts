import { Document, Model, Types } from "mongoose"
import { IOrganization } from "./organization.interface"

export interface IUser {
  id?: any
  firstName: string
  lastName: string
  /** Combination of firstName and lastName */
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
  organizations?: Array<Types.ObjectId>
  activeOrganization?: Types.ObjectId | IOrganization | string
  organizationRole?: "admin" | "user"
}

export type IUserDoc = IUser & Document

export interface IUserModel extends Model<IUserDoc> {
  isEmailTaken(email: string, excludeUserId?: Types.ObjectId): Promise<boolean>
}

export interface IUserAdd {
  socialSecurityNumber?: string
  firstName?: string
  lastName?: string

  email?: string
  organizationRole?: "admin" | "user"

  workemail?: string
  workPhoneNumber?: string

  homePhoneNumber?: string
  privatePhoneNumber?: string

  emergencyFirstName?: string
  emergencyLastName?: string
  emergencyPhoneNumber?: string
}