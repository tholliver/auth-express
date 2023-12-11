import { httpStatusCodes } from './httpStatusCodes'

class AppError extends Error {
  constructor(
    name,
    statusCode,
    description,
    isOperational,
    errorStack,
    logingErrorResponse
  ) {
    super(description)
    Object.setPrototypeOf(this, new.target.prototype)
    this.name = name
    this.statusCode = statusCode
    this.isOperational = isOperational
    this.errorStack = errorStack
    this.logError = logingErrorResponse
    Error.captureStackTrace(this)
  }
}

class APIError extends Error {
  constructor(
    name,
    statusCode = httpStatusCodes.INTERNAL_SERVER,
    description = 'Internal Server Error',
    isOperational = true
  ) {
    super(name, statusCode, description, isOperational)
  }
}

class BadRequestError extends AppError {
  constructor(description = 'Bad request', logingErrorResponse) {
    super(
      'NOT FOUND',
      httpStatusCodes.BAD_REQUEST,
      description,
      true,
      false,
      logingErrorResponse
    )
  }
}

class ValidationError extends AppError {
  constructor(description = 'Validation Error', errorStack) {
    super(
      'BAD REQUEST',
      httpStatusCodes.BAD_REQUEST,
      description,
      true,
      errorStack
    )
  }
}

export { ValidationError, BadRequestError, APIError, AppError, httpStatusCodes }
