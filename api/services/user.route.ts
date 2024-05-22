import baseHandler, { StatusCodes } from "./helpers/base-handler";


export const login = baseHandler(async () => {
  return { data: "", status: StatusCodes.Ok }
})

export const register = baseHandler(async () => {
  return { data: "", status: StatusCodes.Created }
})

export const me = baseHandler(async ({ user }) => {
  return { data: user.toObject({ virtuals: true }), status: StatusCodes.Ok }
})