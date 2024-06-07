import { Types } from "mongoose"

export type AbsenceType = "sick" | "offday" | "vacation"

export interface IAbsence {
    id?: any
    user: Types.ObjectId
    type: AbsenceType
    dateFrom: Date
    organization: Types.ObjectId
    dateTo: Date
    description?: string
    updatedAt?: Date
    createdAt?: Date
}

export interface IAbsenceRange {
    dateFrom: Date
    dateTo: Date
    type: AbsenceType
    description?: string
}
