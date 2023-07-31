interface DB {
  dbConnection: () => void
  dbOnDisconnect: () => void
}
