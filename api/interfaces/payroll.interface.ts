import { Types } from "mongoose"

export interface IPayroll {
  id?: any
  employee: Types.ObjectId
  preTaxAmount: number
  afterTaxAmount: number
  dateFrom: Date
  dateTo: Date
  updatedAt?: Date
  createdAt?: Date
  file: Types.ObjectId
}
