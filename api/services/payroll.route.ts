import baseHandler, { StatusCodes } from "./helpers/base-handler"
import Payroll from "./utils/payroll.utils"

export const create = baseHandler(async ({ user, body }) => {

  const payrollSetup = new Payroll(user)
  await payrollSetup.create(body, user)

  return { data: await payrollSetup.getter(), status: StatusCodes.Created }
}, "admin")

export const get = baseHandler(async ({ user, params }) => {
  const { id } = params
  const payrollSetup = new Payroll(user, id)

  const payrollSetupInfo = await payrollSetup.getter()

  if (payrollSetupInfo) {
    return { data: payrollSetupInfo, status: StatusCodes.NotFound }
  } else {
    return { data: {}, status: StatusCodes.NotFound }
  }
}, "any")

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