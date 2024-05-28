import bcrypt from "bcrypt";
import { IUserAdd } from "../../interfaces/user.interface";
import { validateObject } from "../lib/validator";
import userModel from "../models/user.model";
import getAuthToken from "./helpers/auth-token-generation";
import baseHandler, { StatusCodes } from "./helpers/base-handler";
import Organization from "./utils/organization.utils";


export const login = baseHandler(async ({ body }) => {
  const { email, password } = body as { email: string, password: string }

  const user = await userModel.findOne({
    email: email
  }).select('password')

  if (!user) {
    return { data: "E-mail or Password is incorrect", status: StatusCodes.Unauthorized }
  }

  const isCorrect = await bcrypt.compare(password, user.password)

  if (isCorrect) {
    return { data: getAuthToken(user), status: StatusCodes.Ok }
  } else {
    return { data: "E-mail or Password is incorrect", status: StatusCodes.Unauthorized }
  }
})

export const register = baseHandler(async ({ }) => {
  return { data: "", status: StatusCodes.Created }
})

export const me = baseHandler(async ({ user }) => {

  await user.populate("activeOrganization")

  return { data: user?.toObject({ virtuals: true }), status: StatusCodes.Ok }
}, "any")

export const add = baseHandler(async ({ user, body }) => {
  const newUser = body as IUserAdd

  const inValid = validateObject({
    email: ["required", "email"],
    firstName: ["required"],
    lastName: ["required"],
    socialSecurityNumber: ["required"],
    organizationRole: ["required"],
  }, newUser)

  if (inValid) {
    return { data: inValid, status: StatusCodes.BadRequest }
  }

  const org = new Organization(user.activeOrganization as any)
  const newOrgUser = await org.addUser(newUser)

  return { data: newOrgUser, status: StatusCodes.Created }
}, "admin")