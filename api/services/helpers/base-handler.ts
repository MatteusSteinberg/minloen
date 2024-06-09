import { NextFunction, Request, Response } from "express"
import { HydratedDocument } from "mongoose"
import { Readable } from "stream"
import { IFile } from "../../../interfaces/file.interface"
import { IUser } from "../../../interfaces/user.interface"
import { readFile } from './file-helper'

export type File = Partial<IFile>

export type CustomStream = { contentType: string, buffer: any }

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
    stream?: CustomStream,
    redirect?: string
    file?: File
  }
  | {
    /** `res.status(status).redirect(redirect)` */
    status: StatusCodes
    redirect: string
    data?: any
    stream?: CustomStream,
    file?: File
  }
  | {
    /** `res.status(status).pipe(file)` */
    status: StatusCodes
    file: File
    data?: any
    stream?: CustomStream,
    redirect?: string
  }
  | {
    /** `res.status(status).pipe(stream)` */
    status: StatusCodes
    data?: any
    stream?: CustomStream,
    redirect?: string
    file?: File
  }
  | {
    status: StatusCodes
    stream: CustomStream,
    file?: File
    redirect?: string
    data?: any
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
      const { data, status, redirect, stream, file } = await cb({ file: req.file as any, body: req.body, params: req.params, query: req.query, user: (req as any).user })

      if (redirect) {
        res.redirect(status, redirect)
        return redirect // For testing
      }

      if (file) {
        const stream = await readFile(file.key)
        res.setHeader("Content-Type", file.contentType)
        stream.pipe(res)
        res.status(status)
        return file // For testing
      }

      if (stream) {
        res.header("content-type", stream.contentType)
        const fileBuffer = Buffer.from(stream.buffer)
        const readableStream = Readable.from(fileBuffer)
        readableStream.pipe(res)
        res.status(200)
        return
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