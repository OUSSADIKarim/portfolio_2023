import mongoose from "mongoose"
import dotenv from "dotenv"

dotenv.config()

const DB_URL = process.env.DB_URL

const db: DB = {
  dbConnection: async () => {
    try {
      await mongoose.connect(`${DB_URL}`)
      console.log(`connected to ${DB_URL}`)
    } catch (error) {
      console.error(`Error connecting to the database: ${error}`)
    }
  },

  dbOnDisconnect: () => {
    mongoose.connection.on("disconnected", () => {
      console.log("DB disconnected")
    })
  },
}

export default db
