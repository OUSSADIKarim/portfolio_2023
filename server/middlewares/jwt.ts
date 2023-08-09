import { Request, Response, NextFunction } from "express"
import CustomError from "../utils/createError"
import { verify } from "jsonwebtoken"
import appConfig from "../config/config"
import { AccessTokenRequest } from "../types/auth"

export const verifyAccessToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader: string | undefined = req.headers["authorization"]

  if (!authHeader) {
    next(new CustomError(401, "You don't have auth for this action"))
    return
  }

  const accessToken: string = authHeader.split(" ")[1]

  verify(
    accessToken,
    appConfig.ACCESS_TOKEN_SECRET,
    async (error, decodeedToken) => {
      if (error) {
        next(new CustomError(403, error.message))
        return
      }

      ;(req as AccessTokenRequest).user = decodeedToken
      next()
    }
  )
}
