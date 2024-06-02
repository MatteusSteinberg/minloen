import { Types } from "mongoose"

export interface IDriving {
    id?: any
    user: Types.ObjectId
    organization: Types.ObjectId
    locationFrom: string
    locationTo: string
    date: Date
    licensePlate: string
    description: string
    roundtrip?: boolean
    distance: number
    updatedAt?: Date
    createdAt?: Date
}
