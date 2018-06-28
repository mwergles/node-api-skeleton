const winston = require('winston')

const format = winston.format.combine(
  winston.format.colorize(),
  winston.format.timestamp(),
  winston.format.align(),
  winston.format.printf((info) => {
    const {timestamp, level, message} = info
    const ts = timestamp.replace(/(.*?)T(.*?)\..*/, '$1 $2')

    return `${ts} [${level}]: ${message}`
  })
)

const logger = winston.createLogger({
  level: 'info',
  transports: [
    new winston.transports.Console({
      format: format
    })
  ]
})

module.exports = {
  write: function (message) {
    const status = message.replace(/\w+\s.*?\s(\d+).*/, '$1')
    message = message.replace('\n', '')

    if (status >= 400) {
      return logger.error(message)
    }

    logger.info(message)
  }
}
