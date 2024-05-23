import { Application } from "express";
import organizationRouter from "./organization";
import userRouter from "./user";

export default function registerRoutes(app: Application) {
  app.use("/api/user", userRouter)
  app.use("/api/organization", organizationRouter)
}
