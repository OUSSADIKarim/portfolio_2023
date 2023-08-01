import { Request, Response, NextFunction } from "express"
import CustomError from "../utils/createError"
import { CreateUserInputs, UserDocument } from "../types/user"
import {
  createUserService,
  getAllUserService,
  getUserByIdService,
} from "./../services/userServices"

export const getUsers = async (
  req: Request,
  res: Response<UserDocument[]>,
  next: NextFunction
) => {
  try {
    const users: UserDocument[] = await getAllUserService()
    res.status(200).json(users)
  } catch (error: any) {
    next(new CustomError(error.status, error.message))
  }
}

export const getUserById = async (
  req: Request<{ userId: string }, {}, {}, {}>,
  res: Response<UserDocument | null>,
  next: NextFunction
) => {
  const { userId } = req.params

  try {
    const user: UserDocument | null = await getUserByIdService(userId)
    res.status(200).json(user || null)
  } catch (error: any) {
    next(new CustomError(error.status, error.message))
  }
}

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
