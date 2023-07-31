interface UserDocument extends Document {
  name: string
  email: string
  password: string
}

interface CreateUserInputs {
  name: string
  email: string
  password: string
}
