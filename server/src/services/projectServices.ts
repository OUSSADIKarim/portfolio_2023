import { Project } from "../models/Project"
import { ProjectDocument, ProjectImage } from "../types/project"
import CustomError from "../utils/createError"

export const getAllProjectsService = async (): Promise<ProjectDocument[]> => {
  try {
    const projects: ProjectDocument[] = await Project.find({})
    return projects
  } catch (error: any) {
    throw error
  }
}

export const getProjectByIdService = async (
  projectId: string
): Promise<ProjectDocument | null> => {
  try {
    const project: ProjectDocument | null = await Project.findById(projectId)
    return project
  } catch (error: any) {
    throw error
  }
}

export const createProjectService = async (
  userId: string,
  name: string,
  description: string,
  link: string,
  images?: ProjectImage[]
) => {
  try {
    const newProject: ProjectDocument = await Project.create({
      userId,
      name,
      description,
      link,
      images,
    })
    return newProject
  } catch (error: any) {
    throw error
  }
}

export const deleteProjectService = async (projectId: string) => {
  try {
    const deletedProject: ProjectDocument | null =
      await Project.findOneAndRemove({ _id: projectId })
    if (!deletedProject) {
      throw new CustomError(404, "Project not found.")
    }
    return deletedProject
  } catch (error: any) {
    throw error
  }
}

export const updateProjectService = async (
  projectId: string,
  name: string,
  description: string,
  link: string,
  images?: ProjectImage[]
) => {
  try {
    const updatedProject = await Project.findByIdAndUpdate(projectId, {
      name,
      description,
      link,
      images,
    })
    if (!updatedProject) {
      throw new CustomError(404, "Project not found.")
    }
    return updatedProject
  } catch (error: any) {
    throw error
  }
}
