const path = require('path')
const winston = require('winston')
const config = require('../../config')

const consoleFormat = winston.format.combine(
  winston.format.colorize(),
  winston.format.timestamp(),
  winston.format.align(),
  winston.format.printf((info) => {
    const {timestamp, level, message, ...args} = info
    const ts = timestamp.replace(/(.*?)T(.*?)\..*/, '$1 $2')

    return `${ts} [${level}]: ${message} ${Object.keys(args).length ? JSON.stringify(args, null, 2) : ''}`
  })
)

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({
      filename: path.join(__dirname, '../../var/logs/error.log'),
      level: 'error'
    }),
    new winston.transports.File({
      filename: path.join(__dirname, '../../var/logs/combined.log')
    })
  ],
  exitOnError: false
})

if (config.isDevelopment()) {
  logger.add(new winston.transports.Console({
    level: 'debug',
    handleExceptions: true,
    format: consoleFormat
  }))
}

module.exports = logger
