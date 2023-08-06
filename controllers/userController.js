import userModel from '../models/userModel.js'

class UserController {
  async registerUser(ctx) {
    try {
      const { username, password } = ctx.request.body
      const userId = await userModel.createUser(username, password)
      ctx.body = { success: true, userId }
    } catch (err) {
      ctx.status = 500
      ctx.body = { success: false, message: 'User registration failed.' }
    }
  }
}

export default new UserController()
