import mongoose from "mongoose"
import dotenv from "dotenv"

dotenv.config()

const dbUrl = process.env.DB_URL

const db: DB = {
  dbConnection: async () => {
    try {
      await mongoose.connect(`${dbUrl}`)
      console.log(`connected to ${dbUrl}`)
    } catch (error) {
      throw error
    }
  },

  dbOnDisconnect: () => {
    mongoose.connection.on("disconnected", () => {
      console.log("DB disconnected")
    })
  },
}

export default db
