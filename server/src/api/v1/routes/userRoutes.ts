import express, { Router } from "express"
import { verifyAccessToken } from "../../../middlewares/jwt"
import {
  createUser,
  getUserById,
  getUsers,
} from "../../../controllers/userController"

export const userRouter: Router = express.Router()

userRouter.get("/", verifyAccessToken, getUsers)
userRouter.get("/:userId", getUserById)
userRouter.post("/", createUser)
