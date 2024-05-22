import baseHandler, { StatusCodes } from "./helpers/base-handler";


export const login = baseHandler(async () => {
  return { data: "", status: StatusCodes.Ok }
})

export const register = baseHandler(async () => {
  return { data: "", status: StatusCodes.Ok }
})