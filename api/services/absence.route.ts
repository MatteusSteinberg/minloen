import { IAbsence } from "../../interfaces/absence.interface"
import { validateObject } from "../lib/validator"
import absenceModel from "../models/absence.model"
import baseHandler, { StatusCodes } from "./helpers/base-handler"

export const add = baseHandler(async ({ user, body }) => {
    const absenceBody = body as IAbsence
    const invalid = validateObject(
        {
            dateFrom: ["required"],
            dateTo: ["required"],
            type: ["required"],
        },
        absenceBody
    )

    if (invalid) {
        return { data: invalid, status: StatusCodes.BadRequest }
    }

    const hasAbsence = await absenceModel.findOne({
        user: user._id,
        dateFrom: { $lte: absenceBody.dateTo },
        dateTo: { $gte: absenceBody.dateFrom },
    })

    if (hasAbsence) {
        return { data: "User already has an absence in this period", status: StatusCodes.BadRequest }
    }

    await new absenceModel({ ...body, user: user._id, organization: user.activeOrganization }).save()

    return { data: {}, status: StatusCodes.Created }
}, "user")

export const list = baseHandler(async ({ user, query }) => {
    const searchDate = new Date(query.date)
    const year = searchDate.getFullYear()
    const month = searchDate.getMonth()

    const dateFrom = new Date(year, month, 1)
    const dateTo = new Date(year, month + 1, 0)

    const absencesAggregate = [
        {
            $match: {
                user: user._id,
                dateFrom: { $gte: dateFrom },
                dateTo: { $lte: dateTo },
            },
        },
        {
            $project: {
                _id: 0,
                dateFrom: 1,
                dateTo: 1,
                cause: "$type",
                description: "$description",
            },
        },
        {
            $sort: {
                dateFrom: 1 as const,
            },
        },
    ]

    let absences = await absenceModel.aggregate(absencesAggregate)

    return { data: absences, status: StatusCodes.Ok }
}, "user")

export const listMetadata = baseHandler(async ({ user }) => {
    const count = await absenceModel.countDocuments({
        user: { $eq: user._id },
    })

    return { data: { count: count, size: 10 }, status: StatusCodes.Ok }
}, "user")

export const metadata = baseHandler(async ({ user }) => {
    const currentDate = new Date()
    const currentYear = currentDate.getFullYear()
    const isBeforeSeptember = currentDate < new Date(`${currentYear}-09-01`)

    const dateFrom = new Date(`${isBeforeSeptember ? currentYear - 1 : currentYear}-09-01`)
    const dateTo = new Date(`${isBeforeSeptember ? currentYear : currentYear + 1}-08-31`)

    const absenceStatsAggregate = [
        {
            $match: {
                user: user._id,
                dateFrom: { $gte: dateFrom },
                dateTo: { $lte: dateTo },
            },
        },
        {
            $project: {
                type: "$type",
                days: {
                    $add: [
                        1,
                        {
                            $divide: [
                                { $subtract: ["$dateTo", "$dateFrom"] },
                                1000 * 60 * 60 * 24, // Convert milliseconds to days
                            ],
                        },
                    ],
                },
            },
        },
        {
            $group: {
                _id: "$type",
                total: { $sum: { $floor: "$days" } },
            },
        },
    ]

    const absences = await absenceModel.aggregate(absenceStatsAggregate)

    return { data: absences, status: StatusCodes.Ok }
}, "user")
