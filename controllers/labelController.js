import labelModel from '../models/labelModel.js'

class LabelController {
  async createLabel(ctx) {
    try {
      const labels = ctx.state.labels

      const result = await labelModel.createLabel(labels)
      ctx.body = { success: true, message: 'Label create succeed.', data: result }
    } catch (err) {
      throw err
    }
  }
}

export default new LabelController()
