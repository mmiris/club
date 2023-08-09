import commentModel from '../models/commentModel.js'

class CommentController {
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
}

export default new CommentController()
