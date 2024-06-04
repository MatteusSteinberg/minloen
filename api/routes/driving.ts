import express from "express"
import { add, get, list, listMetadata, update } from "../services/driving.route"

const drivingRouter = express.Router()

// POST
drivingRouter.post("/", add)

// GET
drivingRouter.get("/list", list)
drivingRouter.get("/:id", get)
drivingRouter.get("/list/meta", listMetadata)

// PATCH
drivingRouter.patch("/:id", update)

export default drivingRouter
