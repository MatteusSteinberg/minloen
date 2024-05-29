import { S3 } from "@aws-sdk/client-s3"
import multer from "multer"
import multerS3 from "multer-s3"
import { v4 as uuidv4 } from "uuid"
import baseHandler, { HandlerRequest, HandlerResponse } from "./base-handler"

const upload = multer({
    storage: multerS3({
        s3: new S3({
            forcePathStyle: false,
            endpoint: process.env.SPACES_ENDPOINT,
            region: process.env.SPACES_REGION,
            credentials: {
                accessKeyId: process.env.SPACES_ACCESS_KEY,
                secretAccessKey: process.env.SPACES_SECRET,
            },
        }),
        acl: "public-read",
        bucket: process.env.SPACES_BUCKET as string,
        key: function (req, file, cb) {
            cb(null, uuidv4())
        },
    }),
})

const fileHandler = (fileField: string, cb: (request: HandlerRequest) => Promise<HandlerResponse>, requiresAuth?: boolean) => {
    return [
        upload.single(fileField),
        baseHandler(async (request: HandlerRequest) => {
            const baseResponse = await cb(request)
            return baseResponse
        }),
    ]
}

export default fileHandler
