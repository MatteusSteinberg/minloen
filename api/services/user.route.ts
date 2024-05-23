import bcrypt from "bcrypt";
import userModel from "../models/user.model";
import getAuthToken from "./helpers/auth-token-generation";
import baseHandler, { StatusCodes } from "./helpers/base-handler";


export const login = baseHandler(async ({ body }) => {
  const { email, password } = body as { email: string, password: string }

  const user = await userModel.findOne({
    email: email
  }).select('password')

  const isCorrect = await bcrypt.compare(password, user.password)

  if (isCorrect) {
    return { data: getAuthToken(user), status: StatusCodes.Ok }
  } else {
    return { error: "User not found", status: StatusCodes.Unauthorized }
  }
})

export const register = baseHandler(async () => {
  return { data: "", status: StatusCodes.Created }
})

export const me = baseHandler(async ({ user }) => {

  await user.populate("activeOrganization")

  return { data: user?.toObject({ virtuals: true }), status: StatusCodes.Ok }
})