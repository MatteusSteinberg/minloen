import { HydratedDocument } from "mongoose"
import { IOrganization } from "../../../interfaces/organization.interface"
import { IUser } from "../../../interfaces/user.interface"
import userModel from "../../models/user.model"


export namespace User {

  export const registerInitialAdminUser = async (user: IUser, organization: HydratedDocument<IOrganization>) => {

    const userDoc: HydratedDocument<IUser> = await userModel.create({
      ...user,
      activeOrganization: organization._id,
      organizations: [organization._id],
    })


    return userDoc
  }

  const registerOrgUser = () => {

  }

}