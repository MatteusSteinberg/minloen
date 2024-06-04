import { Application } from "express";
import organizationRouter from "./organization";
import payrollRouter from "./payroll";
import userRouter from "./user";

export default function registerRoutes(app: Application) {
  app.use("/api/user", userRouter)
  app.use("/api/organization", organizationRouter)
  app.use("/api/payroll", payrollRouter)
}
