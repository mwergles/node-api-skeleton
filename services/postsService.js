const posts = require('../tests/fixtures/posts.json')

module.exports = {
  async getPosts () {
    return posts.data
  },
  async getPost (id) {
    const post = posts.data.filter((p) => p.id === id)

    if (!post.length) {
      return null
    }

    return post[0]
  }
}
