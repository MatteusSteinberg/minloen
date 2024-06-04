import express from "express";
import { create, getByUser, update } from "../services/payroll.route";

const payrollRouter = express.Router()


// POST
payrollRouter.post('/', create)

// GET
payrollRouter.get('/:user', getByUser)

// PATCH
payrollRouter.patch('/:id', update)

export default payrollRouter