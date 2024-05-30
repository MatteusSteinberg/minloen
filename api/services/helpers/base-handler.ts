import { NextFunction, Request, Response } from "express"
import { HydratedDocument } from "mongoose"
import { IFile } from "../../../interfaces/file.interface"
import { IUser } from "../../../interfaces/user.interface"

export type File = Partial<IFile>

export enum StatusCodes {
  Ok = 200,
  Created = 201,
  BadRequest = 400,
  Unauthorized = 401,
  NotFound = 404,
  /** Already exists */
  Conflict = 409,
  ServerError = 500
}

export type HandlerResponse =
  | {
    /** `res.status(status)` */
    status: StatusCodes
    /** `res.json(data)` */
    data: any
    redirect?: string
    file?: File
  }
  | {
    /** `res.status(status).redirect(redirect)` */
    status: StatusCodes
    redirect: string
    data?: any
    file?: File
  }
  | {
    /** `res.status(status).pipe(file)` */
    status: StatusCodes
    file: File
    data?: any
    redirect?: string
  }
  | {
    /** `res.status(status).pipe(stream)` */
    status: StatusCodes
    data?: any
    redirect?: string
    file?: File
  }

export type HandlerRequest = {
  body: any
  params: any
  query: any
  user: HydratedDocument<IUser> | undefined,
  file?: Express.MulterS3.File
}

const baseHandler = (cb: (request: HandlerRequest) => Promise<HandlerResponse>, requiresRole?: "admin" | "user" | "any") => {
  return async (req: Request, res: Response, next: NextFunction) => {
    if (requiresRole && !(req as any).user) {
      const user = (req.user as HydratedDocument<IUser>)
      if (!user) {
        res.status(401).json("Unauthorized")
        return
      }
      if (user.organizationRole !== "admin" && requiresRole === "admin") {
        res.status(401).json("Unauthorized")
        return
      }
      if (user.organizationRole !== "user" && requiresRole === "user") {
        res.status(401).json("Unauthorized")
        return
      }
    }

    try {
      const { data, status, redirect } = await cb({ body: req.body, params: req.params, query: req.query, user: (req as any).user })

      if (redirect) {
        res.redirect(status, redirect)
        return redirect // For testing
      }

      res.status(status as number).json(data)
      return data // For testing
    } catch (err) {
      res.status(StatusCodes.ServerError).json({ message: "Internal server error" })
      if (process.env.NODE_ENV === "test") throw err
      next(err)
    }
  }
}

export default baseHandler