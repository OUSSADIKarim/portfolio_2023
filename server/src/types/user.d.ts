import { Document } from "mongoose"

interface UserDocument extends Document {
  firstName: string
  lastName: string
  email: string
  password: string
}

interface CreateUserInputs {
  firstName: string
  lastName: string
  email: string
  password: string
}
