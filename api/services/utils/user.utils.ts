import _ from "lodash"
import { HydratedDocument, Types } from "mongoose"
import { IOrganization } from "../../../interfaces/organization.interface"
import { IUser } from "../../../interfaces/user.interface"
import userModel from "../../models/user.model"
import { encrypt } from "../helpers/encryptor"


export namespace User {

  export const registerInitialAdminUser = async (user: IUser, organization: HydratedDocument<IOrganization>) => {

    const userDoc: HydratedDocument<IUser> = await userModel.create({
      ...user,
      organizationRole: "admin",
      activeOrganization: organization._id,
      organizations: [organization._id],
    })


    return userDoc
  }

  export const update = async (user: Partial<IUser>, id: string | Types.ObjectId, loggedInUser: HydratedDocument<IUser>) => {
    const omitted = _.omit(user, [
      "email", "password", "name", "organizationRole", "activeOrganization", "organizations"
    ] as Array<keyof IUser>)

    return await userModel.findOneAndUpdate({
      _id: new Types.ObjectId(id),
      activeOrganization: loggedInUser.activeOrganization,
    }, {
      $set: {
        ...omitted,
        socialSecurityNumber: user.socialSecurityNumber ? encrypt(user.socialSecurityNumber) : undefined,
        ...(!!user.firstName ? {
          name: [user.firstName.trim(), user.lastName.trim()].join(' ').trim()
        } : {}),
      }
    }, { new: true })
  }
}