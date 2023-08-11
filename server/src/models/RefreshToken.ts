import { Schema, model } from "mongoose"
import { RefreshTokenDocument } from "../types/refreshToken"

const refreshTokenSchema = new Schema<RefreshTokenDocument>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },

  refreshToken: {
    type: String,
    required: true,
  },
})

export const RefreshToken = model<RefreshTokenDocument>(
  "refreshToken",
  refreshTokenSchema
)
