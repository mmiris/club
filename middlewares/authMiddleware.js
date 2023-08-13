import fs from 'node:fs/promises'
import jwt from 'koa-jwt'
import authModel from '../models/authModel.js'
import { ResourceAlreadyExistsError, PermissionError } from '../utils/errors.js'

class AuthMiddleware {
  async verifyAuth() {
    try {
      const publicKey = await fs.readFile('./config/public.pem', 'utf-8')

      return jwt({ secret: publicKey }).unless({
        custom: (ctx) => {
          if (/^\/moment($|\/\d+$)/.test(ctx.path) && ctx.method === 'GET') {
            return true
          } else if (/^\/comment/.test(ctx.path) && ctx.method === 'GET') {
            return true
          }
        },
        path: [/^\/register/, /^\/login/, /^\/uploads\/file/]
      })
    } catch (err) {
      throw err
    }
  }

  async authResourcePermission(ctx, next) {
    try {
      const table = ctx.path.split('/')[1]
      const resourceId = ctx.params.id
      const userId = ctx.state.user.id

      const result = await authModel.authResourcePermission(table, resourceId, userId)

      if (result.length) {
        return await next()
      }
      throw new PermissionError()
    } catch (err) {
      throw err
    }
  }

  async authResourceExists(ctx, next) {
    try {
      const params = ctx.path.split('/')
      const table = params.length > 3 ? params[params.length - 1].replace('s', '') : params[1]
      const props = ctx.request.body.content ? 'content' : table + 's'
      const content = ctx.request.body.content || ctx.request.body[props] || ctx.request.body.name
      let field = 'content'

      const result = await authModel.select(table)
      if (result[1].some((value) => value.name === 'name')) field = 'name'

      if (content instanceof Array) {
        ctx.state[props] = []

        for (const item of content) {
          const result = await authModel.authResourceExists(table, `${field} = '${item}'`)
          if (!result.length) ctx.state[props].push(item)
        }

        if (!ctx.state[props].length) {
          throw new ResourceAlreadyExistsError(
            `Conflict. ${table.at(0).toUpperCase() + props.slice(1)} already exists.`
          )
        }
      } else {
        const result = await authModel.authResourceExists(table, `${field} = '${content}'`)
        if (result.length) {
          throw new ResourceAlreadyExistsError()
        }
      }

      await next()
    } catch (err) {
      throw err
    }
  }
}

export default new AuthMiddleware()
