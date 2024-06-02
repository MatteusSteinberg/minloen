import express from "express"
import { add, get, list, update } from "../services/driving.route"

const drivingRouter = express.Router()

// POST
drivingRouter.post("/", add)

// GET
drivingRouter.get("/", list)
drivingRouter.get("/:id", get)

// PATCH
drivingRouter.patch("/:id", update)

export default drivingRouter
