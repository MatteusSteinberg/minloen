import express from "express";
import { login, register } from "../services/user.route";

const userRouter = express.Router()


// POST
userRouter.post('/login', login)
userRouter.post('/register', register)

// GET

// PATCH

export default userRouter