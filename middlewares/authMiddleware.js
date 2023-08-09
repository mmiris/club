import fs from 'node:fs/promises'
import jwt from 'koa-jwt'
import userModel from '../models/userModel.js'
import authModel from '../models/authModel.js'
import { verifyPassword } from '../utils/cryptoHelpers.js'
import {
  ValidateError,
  UserNotFoundError,
  AuthenticationError,
  PermissionError
} from '../utils/errors.js'

class AuthMiddleware {
  async verifyAuth() {
    const publicKey = await fs.readFile('./config/public.pem', 'utf-8')
    return jwt({ secret: publicKey }).unless({ path: [/^\/register/, /^\/login/] })
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
      const result = verifyPassword(queryUser.password, password)
      if (!result) {
        throw new AuthenticationError()
      }
    } catch (err) {
      throw err
    }

    ctx.state.user = queryUser

    await next()
  }

  async authResourcePermission(ctx, next) {
    try {
      const table = ctx.path.split('/')[1]
      const resourceId = ctx.request.params.id
      const userId = ctx.state.user.id

      const result = await authModel.checkPermission(table, resourceId, userId)

      if (result.length) {
        return await next()
      }
      throw new PermissionError()
    } catch (err) {
      throw err
    }
  }
}

export default new AuthMiddleware()
