const sinon = require('sinon')
const chai = require('chai')
const sinonChai = require('sinon-chai')
const proxiquire = require('proxyquire')
const UnprocessableEntity = require('../../../lib/errors/UnprocessableEntity')

chai.should()
chai.use(sinonChai)

module.exports = () => {
  describe('Unit test validator', () => {
    it('should throw error on validation errors', () => {
      const errors = {
        isEmpty: sinon.stub().returns(false),
        array: sinon.stub().returns([{
          msg: 'Invalid id'
        }])
      }

      const req = {}
      const next = sinon.spy()

      const check = {
        validationResult: sinon.stub().withArgs(req).returns(errors)
      }

      const validator = proxiquire('../../../middlewares/validator', {
        'express-validator/check': check
      })

      validator.bind(req, {}, next).should.throw(UnprocessableEntity, /Invalid id/)
      next.should.not.have.been.called
    })

    it('should call next when no errors detected', () => {
      const errors = {
        isEmpty: sinon.stub().returns(true)
      }
      const next = sinon.spy()

      const check = {
        validationResult: sinon.stub().returns(errors)
      }

      const validator = proxiquire('../../../middlewares/validator', {
        'express-validator/check': check
      })

      validator({}, {}, next)

      next.should.have.been.calledOnce
      next.should.have.been.calledWith()
    })
  })
}
