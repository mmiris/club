import momentModel from '../models/momentModel.js'
import labelModel from '../models/labelModel.js'

class MomentController {
  async getMoment(ctx) {
    try {
      const momentId = ctx.params.id
      const moment = await momentModel.getMoment(momentId)

      ctx.body = { success: true, message: 'Moment get succeed.', data: { moment } }
    } catch (err) {
      throw err
    }
  }

  async getMomentList(ctx) {
    try {
      const momentList = await momentModel.getMomentList()

      ctx.body = { success: true, message: 'MomentList get succeed.', data: { momentList } }
    } catch (err) {
      throw err
    }
  }

  async publishMoment(ctx) {
    try {
      const userId = ctx.state.user.id
      const content = ctx.request.body.content

      const momentId = await momentModel.publishMoment(content, userId)

      ctx.body = { success: true, message: 'Moment publish succeed.', data: { momentId } }
    } catch (err) {
      throw err
    }
  }

  async updateMoment(ctx) {
    try {
      const momentId = ctx.params.id
      const content = ctx.request.body.content

      await momentModel.updateMoment(momentId, content)

      ctx.body = { success: true, message: 'Moment modify succeed.', data: null }
    } catch (err) {
      throw err
    }
  }

  async deleteMoment(ctx) {
    try {
      const momentId = ctx.params.id

      await momentModel.deleteMoment(momentId)

      ctx.body = { success: true, message: 'Moment delete succeed.', data: null }
    } catch (err) {
      throw err
    }
  }

  async addLabels(ctx) {
    const momentId = ctx.params.id
    const momentLabels = ctx.request.body.labels
    const notExistLabels = ctx.state.labels
    const labels = []

    await labelModel.createLabel(notExistLabels)

    for (const label of momentLabels) {
      const [result] = await labelModel.getLabel(label)
      labels.push({ id: result.id })
    }

    const result = await momentModel.addLabels(momentId, labels)

    ctx.body = { success: true, message: 'Labels add succeed.', data: result }
  }
}

export default new MomentController()
