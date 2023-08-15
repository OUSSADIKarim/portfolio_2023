import { Schema, model } from "mongoose"
import { ProjectDocument } from "../types/project"

const projectSchema = new Schema<ProjectDocument>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    name: {
      type: Schema.Types.String,
      required: true,
    },
    description: {
      type: Schema.Types.String,
      required: true,
    },
    link: {
      type: Schema.Types.String,
      required: true,
    },
    images: [
      {
        url: {
          type: Schema.Types.String,
        },
        publicId: {
          type: Schema.Types.String,
        },
      },
    ],
  },
  { timestamps: true }
)

export const Project = model<ProjectDocument>("project", projectSchema)
