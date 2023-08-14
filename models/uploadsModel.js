import pool from '../config/db.js'

class UploadsModel {
  async createAvatar(userId, avatar) {
    try {
      const { filename, mimetype, size } = avatar
      const sql = 'INSERT INTO avatar (filename, mimetype, size, user_id) VALUES (?, ?, ?, ?)'

      const [result] = await pool.execute(sql, [filename, mimetype, size, userId])
      return result
    } catch (err) {
      throw err
    }
  }

  async createFiles(userId, momentId, files) {
    const result = []
    const sql =
      'INSERT INTO file (filename, destination, mimetype, size, moment_id, user_id) VALUES (?, ?, ?, ?, ?, ?)'
    const conn = await pool.getConnection()

    try {
      await conn.beginTransaction()

      for (const file of files) {
        const { filename, destination, mimetype, size } = file

        const [subResult] = await conn.execute(sql, [filename, destination, mimetype, size, momentId, userId])
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
}

export default new UploadsModel()
