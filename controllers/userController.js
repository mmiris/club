import userModel from '../models/userModel.js'

class UserController {
  async registerUser(ctx) {
    try {
      const { name, password } = ctx.request.body
      const userId = await userModel.createUser(name, password)
      ctx.body = { success: true, message: 'User registration succeed.', data: { userId } }
    } catch (err) {
      throw err
    }
  }
}

export default new UserController()
