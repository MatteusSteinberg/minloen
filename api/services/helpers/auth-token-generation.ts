import dayjs from "dayjs"
import utc from "dayjs/plugin/utc"
import jwt from "jsonwebtoken"
import { HydratedDocument } from "mongoose"
import { IUser } from "../../interfaces/user.interface"

dayjs.extend(utc)
export interface IAuthToken {
  id: string
  exp: number
  iat: number
}

const getAuthToken = (user: HydratedDocument<IUser>) => {
  let expires = dayjs().utc().add(1, 'days').unix()
  let token = jwt.sign({
    id: user.id,
    iat: dayjs().utc().unix()
  } as IAuthToken, process.env.SECRET as string, { expiresIn: "7d" })

  return {
    token: token,
    expires: dayjs(expires).unix()
  }
}

export default getAuthToken