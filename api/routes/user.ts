import express from "express"
import { add, get, getProfileImage, list, listMetadata, login, me, update, updateMe, uploadProfileImage } from "../services/user.route"

const userRouter = express.Router()

// POST
userRouter.post('/login', login)
userRouter.post('/', add)
userRouter.post('/profile/image', uploadProfileImage)

// GET
userRouter.get('/', me)
userRouter.get('/list', list)
userRouter.get('/:id', get)
userRouter.get('/list/meta', listMetadata)
userRouter.get('/profile/image/:id', getProfileImage)

// PATCH
userRouter.patch("/", updateMe)
userRouter.patch("/:id", update)

export default userRouter
