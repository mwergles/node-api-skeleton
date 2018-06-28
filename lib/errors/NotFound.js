const HttpError = require('./HttpError')

class NotFound extends HttpError {
  constructor (message) {
    super(message || 'Not found', 404)

    Error.captureStackTrace(this, this.constructor.name)
  }
}

module.exports = NotFound
