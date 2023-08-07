class CustomError extends Error {
  constructor(message, status) {
    super(message || 'Internal Server Error.')
    this.name = this.constructor.name
    this.status = status || 500
  }
}

class ValidateError extends CustomError {
  constructor(message) {
    super(message || 'Validation failed. Some fields are missing or invalid.', 400)
  }
}

class UserAlreadyExistsError extends CustomError {
  constructor(message) {
    super(message || 'User already exists.', 409)
  }
}

class UserNotFoundError extends CustomError {
  constructor(message) {
    super(message || 'User not found.', 404)
  }
}

class PermissionError extends CustomError {
  constructor(message) {
    super(message || 'Permission denied. Insufficient privileges.', 403)
  }
}

class AuthenticationError extends CustomError {
  constructor(message) {
    super(message || 'Authentication failed. Username or password incorrect.', 401)
  }
}

class UnauthorizedError extends CustomError {
  constructor(message) {
    super(message || 'Unauthorized. Token verification failed.', 401)
  }
}

export {
  ValidateError,
  UserAlreadyExistsError,
  UserNotFoundError,
  PermissionError,
  AuthenticationError,
  UnauthorizedError
}
