import userModel from '../models/userModel.js'
import { verifyPassword } from '../utils/cryptoHelpers.js'
import { ValidateError, UserNotFoundError, AuthenticationError } from '../utils/errors.js'

class AuthMiddleware {
  async validateUserLogin(ctx, next) {
    const { name, password } = ctx.request.body

    if (!name || !password) {
      throw new ValidateError()
    }

    try {
      const existingUser = await userModel.checkUserExists(name)
      if (!existingUser.length) {
        throw new UserNotFoundError()
      }
      ctx.state.user = existingUser[0]
    } catch (err) {
      throw err
    }

    try {
      const result = verifyPassword(ctx.state.user.password, password)
      if (!result) {
        throw new AuthenticationError()
      }
    } catch (err) {
      throw err
    }

    await next()
  }
}

export default new AuthMiddleware()
