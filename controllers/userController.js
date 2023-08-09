import fs from 'node:fs/promises'
import jwt from 'jsonwebtoken'
import userModel from '../models/userModel.js'

const privateKey = await fs.readFile('./config/private.pem', 'utf-8')

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

  async loginUser(ctx) {
    const { id, name } = ctx.state.user

    const token = jwt.sign({ id, name }, privateKey, { algorithm: 'RS256', expiresIn: '1h' })

    ctx.body = { success: true, message: 'User login succeed.', data: { token } }
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
