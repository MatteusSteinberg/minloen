import { Types } from "mongoose"

export interface IAbsence {
    id?: any
    user: Types.ObjectId
    type: string
    dateFrom: Date
    organization: Types.ObjectId
    dateTo: Date
    description?: string
    updatedAt?: Date
    createdAt?: Date
}
