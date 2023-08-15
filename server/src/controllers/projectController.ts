import { NextFunction, Request, Response } from "express"
import {
  createProjectService,
  deleteProjectService,
  getAllProjectsService,
  getProjectByIdService,
  updateProjectService,
} from "../services/projectServices"
import {
  CreateProjectInput,
  ProjectDocument,
  UpdateProjectInput,
} from "../types/project"
import CustomError from "../utils/createError"
import { AccessTokenRequest, UserJwtPayload } from "../types/auth"

export const getProjects = async (
  req: Request,
  res: Response<ProjectDocument[]>,
  next: NextFunction
) => {
  try {
    const porjects: ProjectDocument[] = await getAllProjectsService()
    res.status(200).json(porjects)
  } catch (error: any) {
    next(new CustomError(error.status, error.message))
  }
}

export const getProjectById = async (
  req: Request<{ projectId: string }>,
  res: Response<ProjectDocument | null>,
  next: NextFunction
) => {
  const { projectId } = req.params
  try {
    const project: ProjectDocument | null = await getProjectByIdService(
      projectId
    )
    res.status(200).json(project || null)
  } catch (error: any) {
    next(new CustomError(error.status, error.message))
  }
}

export const createProject = async (
  req: Request<{}, {}, CreateProjectInput, {}>,
  res: Response<ProjectDocument>,
  next: NextFunction
) => {
  const { name, description, link } = req.body
  const user = (req as AccessTokenRequest).user as UserJwtPayload

  if (!name || !description || !link) {
    next(new CustomError(400, "Missing required data."))
    return
  }

  try {
    const newProject: ProjectDocument = await createProjectService(
      user._id,
      name,
      description,
      link
    )
    res.status(201).json(newProject)
  } catch (error: any) {
    next(new CustomError(error.status, error.message))
  }
}

export const deleteProject = async (
  req: Request<{ projectId: string }, {}, {}, {}>,
  res: Response,
  next: NextFunction
) => {
  const { projectId } = req.params
  try {
    await deleteProjectService(projectId)
    res.status(200).json({ message: "Project deleted successfully." })
  } catch (error: any) {
    next(new CustomError(error.status, error.message))
  }
}

export const updateProject = async (
  req: Request<{ projectId: string }, {}, UpdateProjectInput, {}>,
  res: Response,
  next: NextFunction
) => {
  const { projectId } = req.params
  const { name, description, link } = req.body
  try {
    const updatedProject = await updateProjectService(
      projectId,
      name,
      description,
      link
    )
    res.status(200).json(updatedProject)
  } catch (error: any) {
    next(new CustomError(error.status, error.message))
  }
}
