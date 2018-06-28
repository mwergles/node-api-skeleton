const chai = require('chai')
const expect = chai.expect
const postService = require('../../../services/postsService')

chai.should()

module.exports = () => {
  describe('Unit test postService', () => {
    it('should get posts', async () => {
      const posts = await postService.getPosts()

      posts.should.be.a('array')
      posts.should.have.be.lengthOf(3)
      posts[0].should.have.property('id').equal('1')
    })

    it('should get post', async () => {
      const post = await postService.getPost('2')

      post.should.be.a('object')
      post.should.have.property('id').equal('2')
    })

    it('should return null when post not found', async () => {
      const post = await postService.getPost('99999999')

      expect(post).to.be.null
    })
  })
}
