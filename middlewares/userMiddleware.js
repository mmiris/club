import userModel from '../models/userModel.js'
import { hashPassword } from '../utils/cryptoHelpers.js'
import { ValidateError, UserAlreadyExistsError } from '../utils/errors.js'

class UserMiddleware {
  async validateUserRegistration(ctx, next) {
    const { name, password } = ctx.request.body

    if (!name || !password) {
      throw new ValidateError()
    }

    try {
      const existingUser = await userModel.checkUserExists(name)
      if (existingUser.length) {
        throw new UserAlreadyExistsError()
      }
    } catch (err) {
      throw err
    }

    await next()
  }

  async encryptPassword(ctx, next) {
    ctx.request.body.password = await hashPassword(ctx.request.body.password)

    await next()
  }
}

export default new UserMiddleware()
