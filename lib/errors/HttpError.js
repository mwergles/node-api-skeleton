class HttpError extends Error {
  constructor (message, status) {
    super(message || 'Server Error')
    this.name = this.constructor.name
    this.message = message
    this.status = status || 500
    Error.captureStackTrace(this, this.constructor.name)
  }
}

module.exports = HttpError
