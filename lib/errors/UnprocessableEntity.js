const HttpError = require('./HttpError')

class UnprocessableEntity extends HttpError {
  constructor (message) {
    super(message || 'Validation error', 422)

    Error.captureStackTrace(this, this.constructor.name)
  }
}

module.exports = UnprocessableEntity
