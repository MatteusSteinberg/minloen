import express from "express";
import { me, register, update } from "../services/organization.route";

const organizationRouter = express.Router()


// POST
organizationRouter.post('/register', register)

// GET
organizationRouter.get('/', me)

// PATCH
organizationRouter.patch('/', update)

export default organizationRouter