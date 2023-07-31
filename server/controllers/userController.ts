import { Request, Response, NextFunction } from "express"
import CustomError from "../utils/createError"
import User from "../models/User"

export const createUser = async (
  req: Request<{}, {}, CreateUserInputs, {}>,
  res: Response<UserDocument>,
  next: NextFunction
) => {
  const { name, email, password } = req.body
  try {
    const newUser: UserDocument = await User.create({ name, email, password })
    res.status(201).json(newUser)
  } catch (error: any) {
    next(new CustomError(error.status, error.message))
  }
}

export const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users: UserDocument[] = await User.find({})
    res.status(200).json(users)
  } catch (error: any) {
    next(new CustomError(error.status, error.message))
  }
}
