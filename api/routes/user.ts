import express from "express";
import { login, me, register } from "../services/user.route";

const userRouter = express.Router()


// POST
userRouter.post('/login', login)
userRouter.post('/register', register)

// GET
userRouter.get('/', me)

// PATCH

export default userRouter