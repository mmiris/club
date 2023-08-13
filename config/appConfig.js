import dotenv from 'dotenv'

dotenv.config()

const environment = process.env.ENVIRONMENT || 'development'

const port = process.env.PORT || 3000

const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER || 'db_user',
  password: process.env.DB_PASSWORD || 'db_password',
  database: process.env.DB_DATABASE || 'my_database'
}

export { environment, port, dbConfig }
export default port
