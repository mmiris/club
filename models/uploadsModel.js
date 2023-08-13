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
}

export default new UploadsModel()
