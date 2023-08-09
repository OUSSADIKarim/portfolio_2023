import { Request, Response, NextFunction } from "express"
import CustomError from "../utils/createError"
import { getUserByEmailService } from "../services/userServices"
import bcrypt from "bcrypt"
import { generateAccessToken, generateRefreshToken } from "../utils/jwtTokens"
import {
  createRefreshTokenService,
  deleteRefreshTokenService,
} from "../services/refreshTokenServices"
import { LoginInput } from "../types/auth"

export const login = async (
  req: Request<{}, {}, LoginInput, {}>,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body

  if (!email || !password) {
    next(new CustomError(400, "Missing required data."))
    return
  }

  try {
    const user = await getUserByEmailService(email)

    if (!user) {
      next(new CustomError(404, "incorrect credentials."))
      return
    }

    const passwordCompare: boolean = await bcrypt.compare(
      password,
      user.password
    )

    if (!passwordCompare) {
      next(new CustomError(404, "incorrect credentials."))
      return
    }

    const accessToken: string = generateAccessToken(user._id)
    const refreshToken: string = generateRefreshToken(user._id)
    await createRefreshTokenService(user._id, refreshToken)

    res.cookie(
      "refreshToken",
      { refreshToken },
      {
        httpOnly: true,
        maxAge: 60 * 60 * 24 * 7 * 1000, // 7days
      }
    )

    res.json({
      accessToken,
      user: {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      },
    })
  } catch (error: any) {
    next(new CustomError(error.status, error.message))
    return
  }
}

export const logout = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const refreshCookie = req.cookies["refreshToken"]

  if (!refreshCookie) {
    next(new CustomError(400, "Something went wrong."))
    return
  }

  const refreshToken = refreshCookie.refreshToken
  if (!refreshToken) {
    next(new CustomError(400, "Something went wrong."))
    return
  }

  try {
    await deleteRefreshTokenService(refreshToken)
    res.clearCookie("refreshToken")
    // res.clearCookie("_csrf")
    res.status(200).json("Logged out.")
  } catch (error: any) {
    next(new CustomError(error.status, error.message))
    return
  }
}
