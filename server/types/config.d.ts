interface APPCONFIG {
  PORT: number
  DB_URL: string
  ENABLE_MORGAN: "true" | "false"
  ACCESS_TOKEN_SECRET: string
  REFRESH_TOKEN_SECRET: string
}
