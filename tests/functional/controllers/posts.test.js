const request = require('supertest')
require('chai').should()

const app = require('../../../app')

module.exports = () => {
  describe('Posts Route', () => {
    describe('GET /posts', () => {
      it('should list all posts', (done) => {
        request(app)
          .get('/posts')
          .expect(200)
          .expect((res) => {
            res.body.should.have.lengthOf(3)
            res.body[0].should.have.property('id').equal('1')
          })
          .end(done)
      })

      it('should get one post', (done) => {
        request(app)
          .get('/posts/2')
          .expect(200)
          .expect((res) => {
            res.body.should.have.a.property('id').equal('2')
          })
          .end(done)
      })

      it('should return 404 when post not exists', (done) => {
        request(app)
          .get('/posts/99999')
          .expect(404)
          .expect((res) => {
            res.body.should.have.property('error').equal('Post not found')
          })
          .end(done)
      })

      it('should return 422 when receive invalid params', (done) => {
        request(app)
          .get('/posts/a')
          .expect(422)
          .expect((res) => {
            res.body.should.have.property('error').equal('Invalid id')
          })
          .end(done)
      })
    })
  })
}
