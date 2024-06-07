import userModel from "../models/user.model"
import baseHandler, { StatusCodes } from "./helpers/base-handler"
import Payroll from "./utils/payroll.utils"

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