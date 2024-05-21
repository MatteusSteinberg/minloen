import { Types } from "mongoose"

export interface IVacation {
  id?: any
  user: Types.ObjectId
  type: string
  dateFrom: Date
  dateTo: Date
  updatedAt?: Date
  createdAt?: Date
}
