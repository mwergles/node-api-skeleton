const express = require('express')
const cookieParser = require('cookie-parser')
const morgan = require('morgan')
const routes = require('./routes')
const errorHandler = require('./middlewares/errorHandler')
const config = require('./config')
const logger = require('./lib/utils/requestLogger')

const app = express()

if (!config.isTest()) {
  app.use(morgan('tiny', {stream: logger}))
}

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

routes(app)

app.use(errorHandler)

module.exports = app
