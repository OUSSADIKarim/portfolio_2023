import { Request, Response, NextFunction, ErrorRequestHandler } from "express"
import CustomError from "../utils/createError"

export const erroHandler = (
  error: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  return res.status(error.status || 500).json({
    status: error.status || 500,
    message: error.message || "Something went wrong",
  })
}
