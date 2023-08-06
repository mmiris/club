import pool from '../config/db.js'

class UserModel {
  async createUser(username, password) {
    try {
      const sql = 'INSERT INTO user (name, password) VALUES (?, ?);'
      const [result] = await pool.execute(sql, [username, password])
      return result.insertId
    } catch (err) {
      console.error('Error while creating user:', err.message)
      throw err
    }
  }
}

export default new UserModel()
