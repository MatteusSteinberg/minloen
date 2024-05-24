import { Types } from "mongoose"

export interface IPayroll {
  id?: any
  user: Types.ObjectId
  organization: Types.ObjectId
  preTaxAmount: number
  afterTaxAmount: number
  dateFrom: Date
  dateTo: Date
  updatedAt?: Date
  createdAt?: Date
  files: Array<Types.ObjectId>
}
