const errorHandler = require('./middlewares/errorHandler.test')
const validator = require('./middlewares/validator.test')
const postService = require('./services/postsService.test')

module.exports = () => {
  errorHandler()
  validator()
  postService()
}
