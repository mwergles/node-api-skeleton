const {validationResult} = require('express-validator/check')
const UnprocessableEntity = require('../lib/errors/UnprocessableEntity')

module.exports = (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    const error = errors.array(true)
    throw new UnprocessableEntity(error[0].msg)
  }

  next()
}
