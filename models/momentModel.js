import pool from '../config/db.js'

class MomentModel {
  async publishMoment(content, userId) {
    try {
      const sql = 'INSERT INTO moment (content, user_id) VALUES (?, ?)'
      const [result] = await pool.execute(sql, [content, userId])
      return result.insertId
    } catch (err) {
      throw err
    }
  }

  async modifyMoment(resourceId, content) {
    try {
      const sql = 'UPDATE moment SET content = ? WHERE id = ?'
      const [result] = await pool.execute(sql, [content, resourceId])
      return result
    } catch (err) {
      throw err
    }
  }

  async deleteMoment(resourceId) {
    try {
      const sql = 'DELETE FROM moment WHERE id = ?'
      const [result] = await pool.execute(sql, [resourceId])
      return result
    } catch (err) {
      throw err
    }
  }
}

export default new MomentModel()
