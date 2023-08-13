import pool from '../config/db.js'

class LabelModel {
  async createLabel(labels) {
    const result = []

    const conn = await pool.getConnection()
    const sql = 'INSERT INTO label (`name`) VALUES (?)'

    conn.beginTransaction()
    try {
      for (const label of labels) {
        const [subResult] = await conn.execute(sql, [label])
        result.push(subResult)
      }
      await conn.commit()
      return result
    } catch (err) {
      await conn.rollback()
      throw err
    } finally {
      conn.release()
    }
  }

  async getLabel(content) {
    const sql = 'SELECT * FROM label WHERE `name` = ?'

    try {
      const [result] = await pool.execute(sql, [content])
      return result
    } catch (err) {
      throw err
    }
  }
}

export default new LabelModel()
