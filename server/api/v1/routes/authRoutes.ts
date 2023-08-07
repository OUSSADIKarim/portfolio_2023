import express, { Router } from "express"
import { login, logout } from "../../../controllers/authController"

export const authRouter: Router = express.Router()

authRouter.post("/login", login)
authRouter.get("/logout", logout)
