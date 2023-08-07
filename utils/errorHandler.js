import {
  ValidateError,
  AuthenticationError,
  UserNotFoundError,
  UserAlreadyExistsError,
  PermissionError
} from './errors.js'

function errorHandler() {
  return async (ctx, next) => {
    try {
      await next()
    } catch (err) {
      let status
      const body = {
        success: false,
        message: '',
        data: null
      }
      switch (err.constructor) {
        case ValidateError:
          status = err.status
          body.message = err.message
          break
        case AuthenticationError:
          status = err.status
          body.message = err.message
          break
        case UserNotFoundError:
          status = err.status
          body.message = err.message
          break
        case UserAlreadyExistsError:
          status = err.status
          body.message = err.message
          break
        case PermissionError:
          status = err.status
          body.message = err.message
          break
        default:
          status = err.status || 500
          body.message = err.message || 'Internal Server Error.'
      }

      ctx.status = status
      ctx.body = body
    }
  }
}

export default errorHandler
