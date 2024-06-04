import baseHandler, { StatusCodes } from "./helpers/base-handler"
import Payroll from "./utils/payroll.utils"

export const create = baseHandler(async ({ user, body }) => {

  const payrollSetup = new Payroll(user)
  await payrollSetup.create(body, user)

  return { data: await payrollSetup.getter(), status: StatusCodes.Created }
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

export const update = baseHandler(async ({ user, params, body }) => {
  const { id } = params

  const payrollSetup = new Payroll(user, id)
  await payrollSetup.update(body, user)

  const payrollSetupInfo = await payrollSetup.getter()

  if (payrollSetupInfo) {
    return { data: payrollSetupInfo, status: StatusCodes.Ok }
  } else {
    return { data: {}, status: StatusCodes.NotFound }
  }
}, "admin")