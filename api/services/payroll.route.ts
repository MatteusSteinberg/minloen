import dayjs from "dayjs"
import { Types } from "mongoose"
import payrollSetupModel from "../models/payroll-setup.model"
import payrollModel from "../models/payroll.model"
import userModel from "../models/user.model"
import baseHandler, { StatusCodes } from "./helpers/base-handler"
import { pdfMaker } from "./helpers/pdf-generator"
import Payroll, { generatePayrollPDF, monthDictionaries } from "./utils/payroll.utils"

export const create = baseHandler(async ({ user, body, params, query }) => {
  const { user: userId } = params
  const { fixed } = query
  const isFixed = fixed === "true"

  const payrollSetup = new Payroll(user)
  const payrollUser = await userModel.findById(userId)
  await payrollSetup.create(body, payrollUser, isFixed)

  return { data: await payrollSetup.getter(isFixed, payrollUser), status: StatusCodes.Created }
}, "admin")

export const getByUser = baseHandler(async ({ user, params, query }) => {
  const { user: userId } = params
  const { fixed } = query

  const payroll = new Payroll(user)

  const payrollSetup = fixed === "true" ?
    await payroll.getFixed(userId)
    : await payroll.getComing(userId)

  return {
    data: payrollSetup,
    status: !!payrollSetup ? StatusCodes.Ok : StatusCodes.NotFound
  }
}, "admin")

export const generate = baseHandler(async ({ user, body, params }) => {
  const { user: userId } = params
  const { month, year } = body as { month: string, year: number }

  const monthIndex: number = (monthDictionaries.monthsFirst as any)[month as any]

  const day = dayjs().set('year', year).set('month', monthIndex).set('day', 14)

  const payrollUser = await userModel.findOne({
    _id: new Types.ObjectId(userId as string),
    activeOrganization: user.activeOrganization
  })
  const payrollSetup = await payrollSetupModel.findOne({
    user: payrollUser._id,
    organization: user.activeOrganization,
    fixed: true
  })
  const { pdfConfig, paymentPeriod } = await generatePayrollPDF(payrollUser, payrollSetup, true, day)

  const payroll = await payrollModel.create({
    dateFrom: paymentPeriod[0],
    dateTo: paymentPeriod[1],
    organization: payrollUser.activeOrganization,
    payrollSetup,
    payrollSetupAtGeneration: payrollSetup.toObject({ virtuals: true }),
    pdf: pdfConfig.data,
    user: payrollUser._id,
  })

  return { data: payroll, status: StatusCodes.Ok }
}, "admin")

export const update = baseHandler(async ({ user, params, query, body }) => {
  const { user: userId } = params
  const { fixed } = query
  const isFixed = fixed === "true"

  const payrollSetup = new Payroll(user)
  const payrollUser = await userModel.findById(userId)
  await payrollSetup.update(body, payrollUser, isFixed)

  const payrollSetupInfo = await payrollSetup.getter(isFixed, payrollUser)

  if (payrollSetupInfo) {
    return { data: payrollSetupInfo, status: StatusCodes.Ok }
  } else {
    return { data: {}, status: StatusCodes.NotFound }
  }
}, "admin")

const listSize = 10

export const list = baseHandler(async ({ params, query, user }) => {
  const { user: userId } = params
  const { page } = query as { page?: string }

  const payrollUser = await userModel.findById(userId)
  const payrolls = await payrollModel.find({
    user: payrollUser._id,
    organization: user.activeOrganization
  })
    .sort({ dateFrom: -1 })
    .skip((parseInt(page || "1") - 1) * 10)
    .limit(listSize)


  return { data: payrolls, status: StatusCodes.Ok }
}, "admin")

export const listMetadata = baseHandler(async ({ body, params, user }) => {
  const { user: userId } = params

  const payrollUser = await userModel.findById(userId)
  const metadata = await payrollModel.countDocuments({
    user: payrollUser._id,
    organization: user.activeOrganization
  })

  return { data: { count: metadata, size: listSize }, status: StatusCodes.Ok }
}, "admin")

export const getPayrollPdf = baseHandler(async ({ params }) => {
  const { id } = params

  const payroll = await payrollModel.findById(id)

  const pdfArray = await pdfMaker({ data: payroll.pdf, key: "payroll" })

  return { stream: { buffer: pdfArray, contentType: "application/pdf" }, status: StatusCodes.Ok }
}, "admin")