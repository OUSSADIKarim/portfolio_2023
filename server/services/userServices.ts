import User from "../models/User"
import { UserDocument } from "../types/user"

export const getAllUserService = async (): Promise<UserDocument[]> => {
  try {
    const users: UserDocument[] = await User.find({})
    return users
  } catch (error: any) {
    throw error
  }
}

export const getUserByIdService = async (
  userId: string
): Promise<UserDocument | null> => {
  try {
    const user: UserDocument | null = await User.findById(userId)
    return user
  } catch (error: any) {
    throw error
  }
}

export const createUserService = async (
  firstName: string,
  lastName: string,
  email: string,
  password: string
) => {
  try {
    const newUser: UserDocument = await User.create({
      firstName,
      lastName,
      email,
      password,
    })
    return newUser
  } catch (error: any) {
    throw error
  }
}
