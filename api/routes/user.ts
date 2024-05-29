import express from "express";
import { add, get, list, listMetadata, login, me, register } from "../services/user.route";

const userRouter = express.Router()


// POST
userRouter.post('/login', login)
userRouter.post('/register', register)
userRouter.post('/', add)

// GET
userRouter.get('/', me)
userRouter.get('/list', list)
userRouter.get('/:id', get)
userRouter.get('/list/meta', listMetadata)

// PATCH

export default userRouter