const HttpError = require('./HttpError')

class BadRequest extends HttpError {
  constructor (message) {
    super(message || 'Bad request', 400)

    Error.captureStackTrace(this, this.constructor.name)
  }
}

module.exports = BadRequest
