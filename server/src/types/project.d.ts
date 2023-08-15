import { Document, ObjectId } from "mongoose"

interface ProjectImage {
  url: string
  publicId: string
}

interface ProjectDocument extends Document {
  userId: ObjectId
  name: string
  description: string
  link: string
  images: ProjectImage[]
}

interface CreateProjectInput {
  name: string
  description: string
  link: string
}

interface UpdateProjectInput {
  name: string
  description: string
  link: string
}
