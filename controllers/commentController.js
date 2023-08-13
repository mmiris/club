import commentModel from '../models/commentModel.js'

class CommentController {
  async getComment(ctx) {
    try {
      const { momentId, limit, offset } = ctx.query

      const result = await commentModel.getComment(momentId, limit, offset)

      ctx.body = {
        success: true,
        message: 'Comment get succeed.',
        data: { comment: result }
      }
    } catch (err) {
      throw err
    }
  }

  async publishComment(ctx) {
    try {
      const userId = ctx.state.user.id
      const { id: momentId, content } = ctx.request.body

      const result = await commentModel.publishComment(momentId, content, userId)

      ctx.body = {
        success: true,
        message: 'Comment publish succeed.',
        data: { commentId: result.insertId }
      }
    } catch (err) {
      throw err
    }
  }

  async replyComment(ctx) {
    try {
      const userId = ctx.state.user.id
      const commentId = ctx.params.id
      const { id: momentId, content } = ctx.request.body

      await commentModel.replyComment(commentId, content, userId, momentId)

      ctx.body = { success: true, message: 'Comment reply succeed.', data: null }
    } catch (err) {
      throw err
    }
  }

  async updateComment(ctx) {
    try {
      const commentId = ctx.params.id
      const content = ctx.request.body.content

      await commentModel.updateComment(commentId, content)

      ctx.body = { success: true, message: 'Comment modify succeed.', data: null }
    } catch (err) {
      throw err
    }
  }

  async deleteComment(ctx) {
    try {
      const commentId = ctx.params.id

      await commentModel.deleteComment(commentId)

      ctx.body = { success: true, message: 'Comment delete succeed.', data: null }
    } catch (err) {}
  }
}

export default new CommentController()
