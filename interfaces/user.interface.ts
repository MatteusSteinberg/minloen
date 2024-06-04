import { Document, Model, Types } from "mongoose"
import { IOrganization } from "./organization.interface"

export interface IUserDetails {
  socialSecurityNumber?: string
  firstName?: string
  lastName?: string
  address?: string
  city?: string
  zipCode?: string
  phoneNumber?: string

  workerNumber?: string
  employmentDate?: Date
  resignationDate?: Date
  position?: string
  /** Betalingsordning */
  paymentArrangement?: "ahead" | "behind"

  bankRegistrationNumber?: string
  bankAccountNumber?: string

  standardHours?: number
  salaryType?: "salary" | "hourly"
  /** Gage */
  salary?: number

  /** Timeløn */
  hourlyWage?: number

  /** ATP-ordning */
  ATP?: string

  /** Ambidrag */
  amContribution?: boolean

  /** Ferieordning */
  vacation?: {
    scheme?: "vacationSavings" | "vacationWithPay"
    recipient?: string
    eachYear?: string
  }

  pension?: {
    pensionType?: string
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

  profileImage?: Types.ObjectId
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
