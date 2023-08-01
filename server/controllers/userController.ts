import { Request, Response, NextFunction } from "express"
import CustomError from "../utils/createError"
import User from "../models/User"
import { CreateUserInputs, UserDocument } from "../types/user"
import {
  createUserService,
  getAllUserService,
} from "./../services/userServices"

export const createUser = async (
  req: Request<{}, {}, CreateUserInputs, {}>,
  res: Response<UserDocument>,
  next: NextFunction
) => {
  const { firstName, lastName, email, password } = req.body

  if (!firstName || !lastName || !email || !password) {
    next(new CustomError(400, "Missing required data."))
    return
  }

  try {
    const newUser: UserDocument = await createUserService(
      firstName,
      lastName,
      email,
      password
    )
    res.status(201).json(newUser)
  } catch (error: any) {
    next(new CustomError(error.status, error.message))
  }
}

export const getUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users: UserDocument[] = await getAllUserService()
    res.status(200).json(users)
  } catch (error: any) {
    next(new CustomError(error.status, error.message))
  }
}

export const getuser = async (
  req: Request<{}, {}, {}, {}>,
  res: Response<UserDocument>,
  next: NextFunction
) => {}
