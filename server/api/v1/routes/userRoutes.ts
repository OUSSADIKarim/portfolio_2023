import express, { Router } from "express"
import {
  createUser,
  getUserById,
  getUsers,
} from "../../../controllers/userController"
import { verifyAccessToken } from "../../../middlewares/jwt"

export const userRouter: Router = express.Router()

userRouter.get("/", verifyAccessToken, getUsers)
userRouter.get("/:userId", getUserById)
userRouter.post("/", createUser)
