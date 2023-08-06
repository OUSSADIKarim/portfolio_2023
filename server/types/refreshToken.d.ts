import { ObjectId } from "mongoose"

interface RefreshTokenDocument extends Document {
  userId: ObjectId
  refreshToken: string
}
