import { IOrganizationRegister } from "../../interfaces/organization.interface";
import baseHandler, { StatusCodes } from "./helpers/base-handler";
import Organization from "./utils/organition.utils";
import { User } from "./utils/user.utils";


export const register = baseHandler(async ({ body }) => {
  const newOrganization = body as IOrganizationRegister

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