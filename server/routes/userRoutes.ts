import express, { Router } from "express"
import { createUser, getAllUsers } from "../controllers/userController"

export const userRouter: Router = express.Router()

userRouter.get("/", getAllUsers).post("/", createUser)
