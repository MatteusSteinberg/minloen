import { Types } from "mongoose"

export interface IDriving {
    id: any
    _id?: any
    user: Types.ObjectId
    organization: Types.ObjectId
    locationFrom: string
    locationTo: string
    date: Date
    licensePlate: string
    description: string
    roundtrip?: boolean
    distance: number
    compensation: number
    updatedAt?: Date
    createdAt?: Date
}
