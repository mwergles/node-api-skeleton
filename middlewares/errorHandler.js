const config = require('../config')
const HttpError = require('../lib/errors/HttpError')
const logger = require('../lib/utils/logger')

module.exports = (err, req, res, next) => {
  if (res.headersSent) {
    logger.error(err.message)
    return next(err)
  }

  const status = err.status || 500
  const message = err.message || err
  const data = {error: message}
  const isHttpError = err instanceof HttpError

  if (!isHttpError && err.stack && !config.isProduction()) {
    data.stack = err.stack
  }

  if (!isHttpError) {
    logger.error(message)
  }

  return res.status(status).send(data)
}
