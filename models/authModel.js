import pool from '../config/db.js'

class AuthModel {
  async authResourcePermission(table, resourceId, userId) {
    try {
      const sql = `SELECT * FROM ${table} WHERE id = ? AND user_id = ?`

      const [result] = await pool.execute(sql, [resourceId, userId])

      return result
    } catch (err) {
      throw err
    }
  }

  async select(table) {
    const result = await pool.execute(`SELECT * FROM ${table}`)
    return result
  }

  async authResourceExists(table, condition) {
    const sql = `SELECT * FROM ${table} WHERE ${condition}`

    try {
      const [result] = await pool.execute(sql)
      return result
    } catch (err) {
      throw err
    }
  }
}

export default new AuthModel()
