import { sign } from "jsonwebtoken"
import appConfig from "../config/config"

export const generateAccessToken = (userId: string) => {
  const ACCESS_TOKEN_SECRET = appConfig.ACCESS_TOKEN_SECRET
  const accessToken: string = sign({ _id: userId }, ACCESS_TOKEN_SECRET, {
    expiresIn: "15m",
  })
  return accessToken
}

export const generateRefreshToken = (userId: string) => {
  const REFRESH_TOKEN_SECRET = appConfig.REFRESH_TOKEN_SECRET
  const refreshToken: string = sign({ _id: userId }, REFRESH_TOKEN_SECRET, {
    expiresIn: "7d",
  })
  return refreshToken
}
