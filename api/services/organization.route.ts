import { IOrganizationRegister } from "../../interfaces/organization.interface";
import { validateObject } from "../lib/validator";
import organizationModel from "../models/organization.model";
import userModel from "../models/user.model";
import baseHandler, { StatusCodes } from "./helpers/base-handler";
import Organization from "./utils/organization";
import { User } from "./utils/user.utils";


export const register = baseHandler(async ({ body }) => {
  const newOrganization = body as IOrganizationRegister

  const result = validateObject({
    name: ["required"],
    cvr: ["required", "numberonly"],
    firstName: ["required"],
    lastName: ["required"],
    adminEmail: ["required", "email"],
    password: ["required", "password"],
    passwordRepeat: ["required", "password"],
  }, newOrganization)

  if (result) {
    return { data: result, status: StatusCodes.BadRequest }
  }

  if (newOrganization.password !== newOrganization.passwordRepeat) {
    return { data: "Passwords do not match", status: StatusCodes.BadRequest }
  }

  if (await organizationModel.exists({ cvr: newOrganization.cvr })) {
    return { data: "Company already exists", status: StatusCodes.Conflict }
  }

  if (await userModel.exists({ email: newOrganization.adminEmail })) {
    return { data: "Email is occupied", status: StatusCodes.Conflict }
  }

  const org = new Organization()

  await org.register(newOrganization.name, newOrganization.cvr)

  const user = await User.registerInitialAdminUser({
    email: newOrganization.adminEmail,
    firstName: newOrganization.firstName,
    lastName: newOrganization.lastName,
    password: newOrganization.password,
    name: [newOrganization.firstName, newOrganization.lastName].join(' ').trim()
  }, org.organization)

  return { data: { user, organization: org.organization }, status: StatusCodes.Created }
})

export const me = baseHandler(async ({ user }) => {

  const org = new Organization(user.activeOrganization as any)
  await org.setup()

  return { data: org.organization.toObject({ virtuals: true }), status: StatusCodes.Ok }
})