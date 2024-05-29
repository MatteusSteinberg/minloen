import { Document, Model, Types } from "mongoose"
import { IOrganization } from "./organization.interface"

export interface IUserDetails {
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
  salaryType?: "salary" | "hourly"
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
    pensionType?: string
    /** Eget bidrag % */
    ownContributionPercentage?: number
    /** Eget beløb */
    ownAmount?: string
    /** Firma bidrag % */
    companyContributionPercentage?: number
    /** Firma beløb */
    companyAmount?: string
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
    ownAmount?: string
    companyContributionPercentage?: number
    companyAmount?: string
  }
}

export interface IUser extends IUserDetails {
  id?: any
  _id?: any
  firstName: string
  lastName: string
  /** Combination of firstName and lastName */
  name: string

  email: string
  password?: string
  disabled?: boolean

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
  organizationRole?: "admin" | "user",
}

export type IUserDoc = IUser & Document

export interface IUserModel extends Model<IUserDoc> {
  isEmailTaken(email: string, excludeUserId?: Types.ObjectId): Promise<boolean>
}

export interface IUserAdd extends IUserDetails {
  email?: string
  disabled?: boolean
  organizationRole: "admin" | "user"
}
