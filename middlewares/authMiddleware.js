import fs from 'node:fs/promises'
import jwt from 'koa-jwt'
import authModel from '../models/authModel.js'
import { PermissionError } from '../utils/errors.js'

class AuthMiddleware {
  async verifyAuth() {
    const publicKey = await fs.readFile('./config/public.pem', 'utf-8')

    return jwt({ secret: publicKey }).unless({
      custom: (ctx) => {
        if (/\/moment($|\/\d+$)/.test(ctx.path) && ctx.method === 'GET') {
          return true
        }
      },
      path: [/^\/register/, /^\/login/]
    })
  }

  async authResourcePermission(ctx, next) {
    try {
      const table = ctx.path.split('/')[1]
      const resourceId = ctx.params.id
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
