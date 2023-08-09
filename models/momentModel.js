import pool from '../config/db.js'

class MomentModel {
  async getMoment(momentId) {
    try {
      const sql = 'SELECT * FROM moment WHERE id = ?'

      const [result] = await pool.execute(sql, [momentId])

      return result
    } catch (err) {
      throw err
    }
  }

  async getMomentList() {
    try {
      const sql = 'SELECT * FROM moment'

      const [result] = await pool.execute(sql)

      return result
    } catch (err) {
      throw err
    }
  }

  async publishMoment(content, userId) {
    try {
      const sql = 'INSERT INTO moment (content, user_id) VALUES (?, ?)'

      const [result] = await pool.execute(sql, [content, userId])

      return result.insertId
    } catch (err) {
      throw err
    }
  }

  async modifyMoment(momentId, content) {
    try {
      const sql = 'UPDATE moment SET content = ? WHERE id = ?'

      const [result] = await pool.execute(sql, [content, momentId])

      return result
    } catch (err) {
      throw err
    }
  }

  async deleteMoment(momentId) {
    try {
      const sql = 'DELETE FROM moment WHERE id = ?'

      const [result] = await pool.execute(sql, [momentId])

      return result
    } catch (err) {
      throw err
    }
  }
}

export default new MomentModel()
