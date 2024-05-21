import { Types } from "mongoose"

export interface IDriving {
  id?: any
  user: Types.ObjectId
  organization: Types.ObjectId
  from: string
  to: string
  date: Date
  distance: number
  updatedAt?: Date
  createdAt?: Date
}
