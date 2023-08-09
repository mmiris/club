import userModel from '../models/userModel.js'

class UserController {
  async registerUser(ctx) {
    try {
      const { name, password } = ctx.request.body
      const result = await userModel.registerUser(name, password)
      ctx.body = {
        success: true,
        message: 'User registration succeed.',
        data: { userId: result.insertId }
      }
    } catch (err) {
      throw err
    }
  }

  async hello(ctx) {
    ctx.body = {
      success: true,
      message: null,
      data: { hello: '啊哈哈哈哈哈哈哈哈哈哈哈啊哈', ...ctx.state.user }
    }
  }
}

export default new UserController()
