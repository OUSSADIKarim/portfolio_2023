import mongoose from "mongoose"

const Schema = mongoose.Schema

const UserSchema = new Schema<User>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
})

const User = mongoose.model<User>("user", UserSchema)

export default User