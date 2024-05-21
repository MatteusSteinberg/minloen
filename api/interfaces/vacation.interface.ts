import { Types } from "mongoose"

export interface IVacation {
  id?: any
  user: Types.ObjectId
  type: string
  dateFrom: Date
  organization: Types.ObjectId
  dateTo: Date
  updatedAt?: Date
  createdAt?: Date
}
