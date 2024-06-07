import { HydratedDocument } from "mongoose"
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
            //description: ["required"],
        },
        drivingBody
    )

    if (invalid) {
        return { data: invalid, status: StatusCodes.BadRequest }
    }

    const compensation = body.roundtrip ? body.distance * 3.79 * 2 : body.distance * 3.79

    await new drivingModel({ ...body, user: user._id, organization: user.activeOrganization, compensation }).save()

    return { data: {}, status: StatusCodes.Created }
}, "user")

export const list = baseHandler(async ({ user, query }) => {
    const { page } = query as { page?: string }

    const drivings: HydratedDocument<IDriving>[] = await drivingModel
        .find({
            user: user._id,
        })
        .skip((parseInt(page || "1") - 1) * 10)
        .limit(10)

    return { data: drivings, status: StatusCodes.Ok }
}, "user")

export const listMetadata = baseHandler(async ({ user }) => {
    const count = await drivingModel.countDocuments({
        user: { $eq: user._id },
    })

    return { data: { count: count, size: 10 }, status: StatusCodes.Ok }
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
    const updateBody = body as Partial<IDriving>
    const driving = await drivingModel.findOneAndUpdate({ _id: params.id, user: user._id }, updateBody, { new: true })

    if (!driving) {
        return { data: {}, status: StatusCodes.NotFound }
    }

    return { data: {}, status: StatusCodes.Ok }
}, "user")
