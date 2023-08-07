import pool from '../config/db.js'

class UserModel {
  async createUser(name, password) {
    try {
      const sql = 'INSERT INTO user (name, password) VALUES (?, ?)'
      const [result] = await pool.execute(sql, [name, password])
      return result.insertId
    } catch (err) {
      throw err
    }
  }

  async checkUserExists(name) {
    try {
      const sql = 'SELECT * FROM user WHERE name = ?'
      const [existingUser] = await pool.execute(sql, [name])
      return existingUser
    } catch (err) {
      throw err
    }
  }
}

export default new UserModel()
