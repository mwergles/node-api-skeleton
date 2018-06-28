const env = process.env.NODE_ENV || 'development'
const config = require(`./${env}`)

Object.assign(config, {
  isProduction () {
    return env === 'production'
  },
  isDevelopment () {
    return env === 'development'
  },
  isTest () {
    return env === 'test'
  }
})

module.exports = config
