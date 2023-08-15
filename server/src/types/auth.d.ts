import { Request } from "express"
import { JwtPayload } from "jsonwebtoken"

interface UserJwtPayload extends JwtPayload {
  _id: string
}

interface AccessTokenRequest extends Request {
  user: string | userJwtPayload | undefined
}

interface LoginInput {
  email: string
  password: string
}
