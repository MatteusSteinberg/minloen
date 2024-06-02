import { IDriving } from "../../interfaces/driving.interface"
import { validateObject } from "../lib/validator"
import drivingModel from "../models/driving.model"
import baseHandler, { StatusCodes } from "./helpers/base-handler"

export const add = baseHandler(async ({ user, body }) => {
    const drivingBody = body as IDriving
    const invalid = validateObject(
        {
            date: ["required"],
            locationFrom: ["required"],
            locationTo: ["required"],
            distance: ["required"],
            licensePlate: ["required"],
            description: ["required"],
        },
        drivingBody
    )

    if (invalid) {
        return { data: invalid, status: StatusCodes.BadRequest }
    }

    new drivingModel({ ...body, user: user._id, organization: user.activeOrganization })

    return { data: {}, status: StatusCodes.Created }
}, "user")

export const list = baseHandler(async ({ user, query }) => {
    const { page = 1, limit = 10 } = query
    const startIndex = (page - 1) * limit

    const total = await drivingModel.countDocuments({ user: user._id })

    const drivings = await drivingModel.find({ user: user._id }).skip(startIndex).limit(limit)

    const totalPages = Math.ceil(total / limit)

    return { data: drivings, totalPages, status: StatusCodes.Ok }
}, "user")

// NOTE: What to do if the admin wants to see the list?
// But also enable the owner of the driving to see the whole list with every org he has been with?

// Currently, the user can only see the list of drivings that he has created.

export const get = baseHandler(async ({ user, params }) => {
    const driving = await drivingModel.findOne({ _id: params.id, user: user._id })

    if (!driving) {
        return { data: {}, status: StatusCodes.NotFound }
    }

    return { data: driving, status: StatusCodes.Ok }
}, "user")

export const update = baseHandler(async ({ user, params, body }) => {
    const driving = await drivingModel.findOne({ _id: params.id, user: user._id })

    if (!driving) {
        return { data: {}, status: StatusCodes.NotFound }
    }

    const updateBody = body as Partial<IDriving>

    await driving.updateOne(updateBody)

    return { data: {}, status: StatusCodes.Ok }
}, "user")
