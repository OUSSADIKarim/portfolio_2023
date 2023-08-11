import { Request } from "express"
import { JwtPayload } from "jsonwebtoken"

interface AccessTokenRequest extends Request {
  user: string | JwtPayload | undefined
}

interface LoginInput {
  email: string
  password: string
}
