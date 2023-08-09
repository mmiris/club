import momentModel from '../models/momentModel.js'

class MomentController {
  async publishMoment(ctx) {
    try {
      const content = ctx.request.body.content
      const userId = ctx.state.user.id
      const momentId = await momentModel.publishMoment(content, userId)

      ctx.body = { success: true, message: 'Moment publish succeed.', data: { momentId } }
    } catch (err) {
      throw err
    }
  }

  async modifyMoment(ctx) {
    try {
      const content = ctx.request.body.content
      const resourceId = ctx.request.params.id
      momentModel.modifyMoment(resourceId, content)
      ctx.body = { success: true, message: 'Moment modify succeed.', data: null }
    } catch (err) {
      throw err
    }
  }

  async deleteMoment(ctx) {
    try {
      const resourceId = ctx.request.params.id
      momentModel.deleteMoment(resourceId)
      ctx.body = { success: true, message: 'Moment delete succeed.', data: null }
    } catch (err) {
      throw err
    }
  }
}

export default new MomentController()
