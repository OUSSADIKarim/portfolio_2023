import express, { Router } from "express"
import {
  createProject,
  deleteProject,
  getProjects,
} from "../../../controllers/projectController"
import { verifyAccessToken } from "../../../middlewares/jwt"

export const projectRouter: Router = express.Router()

projectRouter.get("/", getProjects)
projectRouter.post("/", verifyAccessToken, createProject)
projectRouter.delete("/:projectId", verifyAccessToken, deleteProject)
