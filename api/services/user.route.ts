import bcrypt from "bcrypt"
import { HydratedDocument, Types, isValidObjectId } from "mongoose"
import { IUser, IUserAdd } from "../../interfaces/user.interface"
import { validateObject } from "../lib/validator"
import fileModel from '../models/file.model'
import userModel from "../models/user.model"
import getAuthToken from "./helpers/auth-token-generation"
import baseHandler, { StatusCodes } from "./helpers/base-handler"
import { decrypt } from "./helpers/encryptor"
import fileHandler from './helpers/file-handler'
import { deleteFile } from './helpers/file-helper'
import Organization from "./utils/organization.utils"
import { User } from "./utils/user.utils"


export const login = baseHandler(async ({ body }) => {
  const { email, password } = body as { email: string; password: string }

  const user = await userModel
    .findOne({
      email: email,
    })
    .select("password")

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

export const me = baseHandler(async ({ user }) => {
  await user.populate("activeOrganization")

  return { data: user?.toObject({ virtuals: true }), status: StatusCodes.Ok }
}, "any")

export const add = baseHandler(async ({ user, body }) => {
  const newUser = body as IUserAdd

  const inValid = validateObject(
    {
      email: ["required", "email"],
      firstName: ["required"],
      lastName: ["required"],
      socialSecurityNumber: ["required"],
      organizationRole: ["required"],
      ...(newUser.organizationRole === "user"
        ? {
          workerNumber: ["required"],
          employmentDate: ["required"],
          position: ["required"],
          paymentArrangement: ["required"],
          bankRegistrationNumber: ["required"],
          bankAccountNumber: ["required"],
          ATP: ["required"],
          "vacation.scheme": ["required"],
          "vacation.recipient": ["required"],
        }
        : {}),
    },
    newUser
  )

  if (inValid) {
    return { data: inValid, status: StatusCodes.BadRequest }
  }

  const org = new Organization(user.activeOrganization as any)
  const newOrgUser = await org.addUser(newUser)

  return { data: newOrgUser, status: StatusCodes.Created }
}, "admin")

export const list = baseHandler(async ({ query, user }) => {
  const { page } = query as { page?: string }

  const users: HydratedDocument<IUser>[] = await userModel
    .find({
      organizations: { $eq: user.activeOrganization },
    })
    .skip((parseInt(page || "1") - 1) * 10)
    .limit(10)

  return { data: users, status: StatusCodes.Ok }
}, "admin")

export const listMetadata = baseHandler(async ({ user }) => {
  const count = await userModel.countDocuments({
    organizations: { $eq: user.activeOrganization },
  })

  return { data: { count: count, size: 10 }, status: StatusCodes.Ok }
}, "admin")

export const get = baseHandler(async ({ params, user }) => {
  const { id } = params as { id: string }

  const getUser: HydratedDocument<IUser> = await userModel.findOne({
    _id: new Types.ObjectId(id),
    organizations: { $eq: user.activeOrganization },
  })

  const userObj = getUser.toObject({ virtuals: true })
  if (userObj.socialSecurityNumber) {
    try {
      userObj.socialSecurityNumber = decrypt(userObj.socialSecurityNumber)
    } catch (error) {
      // continue
    }
  }

  return { data: userObj, status: StatusCodes.Ok }
}, "admin")

export const updateMe = baseHandler(async ({ user, body }) => {
  const updateBody = body as Partial<IUser>

  const updatedUser = await User.update(updateBody, user._id, user)

  return { data: updatedUser, status: StatusCodes.Ok }
}, "user")

export const update = baseHandler(async ({ params, body, user }) => {
  const { id } = params as { id: string }
  const updateBody = body as Partial<IUser>

  const updateUser = await userModel.findById(id)

  const inValid = validateObject(
    {
      email: ["emptystring"],
      firstName: ["emptystring"],
      lastName: ["emptystring"],
      socialSecurityNumber: ["emptystring"],
      organizationRole: ["emptystring"],
      ...(updateUser.organizationRole === "user"
        ? {
          workerNumber: ["emptystring"],
          employmentDate: ["emptystring"],
          position: ["emptystring"],
          paymentArrangement: ["emptystring"],
          bankRegistrationNumber: ["emptystring"],
          bankAccountNumber: ["emptystring"],
          ATP: ["emptystring"],
          "vacation.scheme": ["emptystring"],
          "vacation.recipient": ["emptystring"],
        }
        : {}),
    },
    updateBody
  )

  if (inValid) {
    return { data: inValid, status: 400 }
  }

  updateBody.firstName = updateBody.firstName || updateUser.firstName
  updateBody.lastName = updateBody.lastName || updateUser.lastName

  const updatedUser = await User.update(updateBody, id, user)

  return { data: updatedUser, status: StatusCodes.Ok }
}, "admin")

export const uploadProfileImage = fileHandler("image", async ({ file, user }) => {
  const imageId = user.profileImage

  if (imageId) {
    const existingFile = await fileModel.findByIdAndDelete(imageId)
    await deleteFile(existingFile.key)
  }

  const newFile = await fileModel.create({ contentType: file.mimetype, fileType: file.fieldname, key: file.key })
  user.profileImage = newFile._id
  await user.save({ validateModifiedOnly: true })

  return { data: {}, status: StatusCodes.Created }
}, "any")

export const getProfileImage = baseHandler(async ({ params }) => {

  const user = await userModel.findOne({
    $or: [
      { email: params.id },
      { _id: isValidObjectId(params.id) ? params.id : null }
    ]
  })

  const imageId = user.profileImage

  if (!imageId) {
    return { file: { key: 'default.png', contentType: 'image/png' }, status: StatusCodes.Ok }
  }

  const image = await fileModel.findById(imageId)

  if (!image) {
    return { file: { key: 'default.png', contentType: 'image/png' }, status: StatusCodes.Ok }
  }

  return { file: image, status: StatusCodes.Ok }
})