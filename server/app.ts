import express, { Express } from "express"
import dotenv from "dotenv"
import db from "./config/db"
import cookieParser from "cookie-parser"
import cors from "cors"
import csurf from "csurf"
import { erroHandler } from "./middlewares/erroHandler"
import { userRouter } from "./routes/userRoutes"
import helmet from "helmet"

dotenv.config()

const app: Express = express()
const PORT = process.env.PORT || 5000

db.dbOnDisconnect()

app.use(helmet())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(
  cors({
    origin: (origin, callback) => {
      const whiteList = ["http://localhost:5173"]
      if (whiteList.indexOf(`${origin}`) !== -1 || !origin) {
        callback(null, true)
      } else {
        callback(new Error("Not allowed by CORS"))
      }
    },
    optionsSuccessStatus: 204,
    credentials: true,
  })
)
// app.use(csurf({ cookie: { httpOnly: true } }))

app.use("/users", userRouter)

app.use(erroHandler)

app.listen(PORT, () => {
  try {
    db.dbConnection()
    console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`)
  } catch (error) {
    console.error(`Error starting the server: ${error}`)
    process.exit(1)
  }
})
