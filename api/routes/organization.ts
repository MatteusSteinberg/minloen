import express from "express";
import { me, register } from "../services/organization.route";

const organizationRouter = express.Router()


// POST
organizationRouter.post('/register', register)

// GET
organizationRouter.get('/', me)

// PATCH

export default organizationRouter