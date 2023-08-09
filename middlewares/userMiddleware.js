import userModel from '../models/userModel.js'
import { hashPassword, verifyPassword } from '../utils/cryptoHelpers.js'
import {
  ValidateError,
  UserAlreadyExistsError,
  UserNotFoundError,
  AuthenticationError
} from '../utils/errors.js'

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

    ctx.request.body.password = await hashPassword(ctx.request.body.password)

    await next()
  }

  async validateUserLogin(ctx, next) {
    const { name, password } = ctx.request.body
    let queryUser = {}

    if (!name || !password) {
      throw new ValidateError()
    }

    try {
      const existingUser = await userModel.checkUserExists(name)
      if (!existingUser.length) {
        throw new UserNotFoundError()
      }
      queryUser = existingUser[0]
    } catch (err) {
      throw err
    }

    try {
      const result = await verifyPassword(queryUser.password, password)
      if (!result) {
        throw new AuthenticationError()
      }
    } catch (err) {
      throw err
    }

    ctx.state.user = queryUser

    await next()
  }
}

export default new UserMiddleware()
