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
  email?: string
  disabled?: boolean
  organizationRole: "admin" | "user"

  socialSecurityNumber?: string
  firstName?: string
  lastName?: string
  address?: string
  phoneNumber?: string

  workerNumber?: string
  employmentDate?: Date
  resignationDate?: Date
  position?: string
  /** Betalingsordning */
  paymentArrangement?: string

  bankRegistrationNumber?: string
  bankAccountNumber?: string

  standardHours?: string
  /** Gage */
  salary?: string

  /** Timeløn */
  hourlyWage?: string

  /** ATP-ordning */
  ATP?: string

  /** Ambidrag */
  amContribution?: boolean

  /** Ferieordning */
  vacation?: {
    scheme?: string
    recipient?: string
    eachYear?: string
  }

  pension?: {
    type?: string
    /** Eget bidrag % */
    ownContributionPercentage?: number
    /** Eget beløb */
    ownAmount?: number
    /** Firma bidrag % */
    companyContributionPercentage?: number
    /** Firma beløb */
    companyAmount?: number
  }

  eIncome?: {
    enabled?: boolean
    productionUnit?: string
    incomeType?: string
  }

  /** Arbejdsmarkeds pension */
  workplacePension?: {
    institute?: string
    agreementCode?: string
    ownContributionPercentage?: number
    ownAmount?: number
    companyContributionPercentage?: number
    companyAmount?: number
  }
}
