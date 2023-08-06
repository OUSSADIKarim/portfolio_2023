import express, { Router } from "express"
import { login } from "../controllers/authController"

export const authRouter: Router = express.Router()

authRouter.post("/login", login)
