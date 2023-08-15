import express, { Router } from "express"
import { userRouter } from "./routes/userRoutes"
import { authRouter } from "./routes/authRoutes"
import { projectRouter } from "./routes/projectRoutes"

export const v1Router: Router = express.Router()

v1Router.use("/users", userRouter)
v1Router.use("/projects", projectRouter)
v1Router.use("/auth", authRouter)
