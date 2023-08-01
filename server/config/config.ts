const appConfig: APPCONFIG = {
  PORT: process.env.PORT ? parseInt(process.env.PORT) : 3000,
  DB_URL: process.env.DB_URL || "mongodb://127.0.0.1:27017/portfolio_2023",
  ENABLE_MORGAN: (process.env.ENABLE_MORGAN as "true" | "false") || "true",
}

export default appConfig
