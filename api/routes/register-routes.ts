import { Application } from "express"
import absenceRouter from "./absence"
import drivingRouter from "./driving"
import organizationRouter from "./organization"
import userRouter from "./user"

export default function registerRoutes(app: Application) {
    app.use("/api/user", userRouter)
    app.use("/api/organization", organizationRouter)
    app.use("/api/driving", drivingRouter)
    app.use("/api/absence", absenceRouter)
}
