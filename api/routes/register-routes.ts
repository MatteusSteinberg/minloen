import { Application } from "express";
import userRouter from "./user";

export default function registerRoutes(app: Application) {
  app.use("/api/user", userRouter)
}
