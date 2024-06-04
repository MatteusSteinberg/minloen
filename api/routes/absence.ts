import express from "express"
import { add, list, listMetadata, metadata } from "../services/absence.route"

const absenceRouter = express.Router()

// POST
absenceRouter.post("/", add)

// GET
absenceRouter.get("/list", list)
absenceRouter.get("/list/meta", listMetadata)
absenceRouter.get("/metadata", metadata)

export default absenceRouter
