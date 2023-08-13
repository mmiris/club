import pool from '../config/db.js'

class CommentModel {
  async getComment(momentId, limit, offset) {
    try {
      const sql = `
      SELECT
      c.id,
      c.content,
      c.createAt cAt,
      c.updateAt uAt,
      JSON_OBJECT( 'id', u.id, 'name', u.\`name\` ) \`user\` 
    FROM
      \`comment\` c
      LEFT JOIN \`user\` u ON u.id = c.user_id 
    WHERE
      moment_id = ?
      LIMIT ? OFFSET ?`

      const [result] = await pool.execute(sql, [momentId, limit, offset])

      return result
    } catch (err) {
      throw err
    }
  }

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

  async updateComment(commentId, content) {
    const sql = 'UPDATE `comment` SET content = ? WHERE id = ?'

    const [result] = await pool.execute(sql, [content, commentId])

    return result
  }

  async deleteComment(commentId) {
    const sql = 'DELETE FROM `comment` WHERE id = ?'

    const [result] = await pool.execute(sql, [commentId])

    return result
  }
}

export default new CommentModel()
