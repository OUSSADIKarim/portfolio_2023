import express, { Router } from "express"
import { createUser, getUsers } from "../controllers/userController"

export const userRouter: Router = express.Router()

userRouter.get("/", getUsers)
userRouter.post("/", createUser)
