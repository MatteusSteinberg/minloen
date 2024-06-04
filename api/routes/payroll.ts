import express from "express";
import { create, update } from "../services/payroll.route";

const payrollRouter = express.Router()


// POST
payrollRouter.post('/', create)

// GET

// PATCH
payrollRouter.patch('/:id', update)

export default payrollRouter