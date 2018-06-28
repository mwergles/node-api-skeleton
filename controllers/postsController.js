const NotFound = require('../lib/errors/NotFound')
const service = require('../services/postsService')

module.exports = {
  async listPosts (req, res) {
    const posts = await service.getPosts()
    res.status(200).send(posts)
  },
  async getPost (req, res) {
    const post = await service.getPost(req.params.id)

    if (!post) {
      throw new NotFound('Post not found')
    }

    res.status(200).send(post)
  }
}
