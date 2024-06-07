import express from "express";
import { create, getByUser, update } from "../services/payroll.route";

const payrollRouter = express.Router()


// POST
payrollRouter.post('/:user', create)

// GET
payrollRouter.get('/:user', getByUser)

// PATCH
payrollRouter.patch('/:user', update)

export default payrollRouter