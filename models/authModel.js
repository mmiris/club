import pool from '../config/db.js'

class AuthModel {
  async checkPermission(table, resourceId, userId) {
    try {
      const sql = `SELECT * FROM ${table} WHERE id = ? AND user_id = ?`
      const [result] = await pool.execute(sql, [resourceId, userId])
      return result
    } catch (err) {
      throw err
    }
  }
}

export default new AuthModel()
