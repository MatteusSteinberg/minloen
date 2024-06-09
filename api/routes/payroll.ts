import express from "express";
import { create, generate, getByUser, getPayrollPdf, list, listMetadata, update } from "../services/payroll.route";

const payrollRouter = express.Router()


// POST
payrollRouter.post('/:user', create)
payrollRouter.post('/generate/:user', generate)

// GET
payrollRouter.get('/pdf/:id', getPayrollPdf)
payrollRouter.get('/list/meta/:user', listMetadata)
payrollRouter.get('/list/:user', list)
payrollRouter.get('/:user', getByUser)


// PATCH
payrollRouter.patch('/:user', update)

export default payrollRouter