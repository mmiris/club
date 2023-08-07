import { dbConfig } from './appConfig.js'
import mysql from 'mysql2'

const config = {
  ...dbConfig,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
}

const pool = mysql.createPool(config)

pool.getConnection((err, connection) => {
  if (err) {
    console.log(err)
    console.error('Database connection error:', err.message)
  } else {
    console.log('Connected to the database pool.')
    connection.release()
  }
})

export default pool.promise()
