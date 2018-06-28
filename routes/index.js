const posts = require('./posts')

module.exports = (app) => {
  app.use('/posts', posts)
}
