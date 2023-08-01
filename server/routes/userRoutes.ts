import express, { Router } from "express"
import {
  createUser,
  getUserById,
  getUsers,
} from "../controllers/userController"

export const userRouter: Router = express.Router()

userRouter.get("/", getUsers)
userRouter.get("/:userId", getUserById)
userRouter.post("/", createUser)
