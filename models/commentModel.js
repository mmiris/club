import pool from '../config/db.js'

class CommentModel {
  async publishComment(momentId, content, userId) {
    try {
      const sql = 'INSERT INTO `comment` (content, moment_id, user_id) VALUES (?,?,?)'

      const [result] = await pool.execute(sql, [content, momentId, userId])

      return result
    } catch (err) {
      throw err
    }
  }

  async replyComment(commentId, content, userId, momentId) {
    try {
      const sql = 'INSERT INTO `comment` (content, moment_id, user_id, comment_id) VALUES (?,?,?,?)'

      const [result] = await pool.execute(sql, [content, momentId, userId, commentId])

      return result
    } catch (err) {
      throw err
    }
  }
}

export default new CommentModel()
