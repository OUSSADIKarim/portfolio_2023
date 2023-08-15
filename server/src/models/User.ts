import { Schema, model, CallbackWithoutResultAndOptionalError } from "mongoose"
import { isEmail, isStrongPassword } from "../utils/validators"
import bcrypt from "bcrypt"
import CustomError from "../utils/createError"
import { UserDocument } from "../types/user"

const userSchema: Schema = new Schema<UserDocument>(
  {
    firstName: {
      type: String,
      required: true,
      unique: true,
    },
    lastName: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      validate: {
        validator: isEmail,
        message: "Invalid email.",
      },
      required: true,
      unique: true,
    },
    password: {
      type: String,
      validate: {
        validator: isStrongPassword,
        message:
          "The password must be strong with at least 8 characters, a lowercase letter, an uppercase letter, a number and a symbol.",
      },
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
)

userSchema.pre<UserDocument>(
  "save",
  async function (
    this: UserDocument,
    next: CallbackWithoutResultAndOptionalError
  ) {
    if (this.isNew) {
      try {
        const salt: string = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(this.password, salt)
        this.password = hashedPassword
        return next()
      } catch (error: any) {
        return next(new CustomError(500, "An internal server error occurred."))
      }
    }
  }
)

export const User = model<UserDocument>("user", userSchema)
