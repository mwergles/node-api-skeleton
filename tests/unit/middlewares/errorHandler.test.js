const sinon = require('sinon')
const chai = require('chai')
const proxiquire = require('proxyquire')
const errorHandler = require('../../../middlewares/errorHandler')
const HttpError = require('../../../lib/errors/HttpError')

chai.should()

module.exports = () => {
  describe('Unit test errorHandler', () => {
    it('should call next only if headers were already sent', () => {
      const logger = {error: sinon.spy()}
      const next = sinon.spy()
      const err = new Error('some error')

      const errorHandler = proxiquire('../../../middlewares/errorHandler', {
        '../lib/utils/logger': logger
      })

      errorHandler(err, {}, {headersSent: true}, next)

      next.should.have.been.calledOnce
      next.should.have.been.calledWith(err)
      logger.error.should.have.been.calledOnce
      logger.error.should.have.been.calledWith(err.message)
    })

    it('should set error to 500 if none', () => {
      const res = {
        status: sinon.stub().returnsThis(),
        send: () => {}
      }

      errorHandler(new Error(), {}, res, () => {})

      res.status.should.have.been.calledOnce
      res.status.should.have.been.calledWith(500)
    })

    it('should only expose error stack if in non productiontion environment', () => {
      const logger = {error: sinon.spy()}
      const config = {isProduction: sinon.stub().returns(false)}
      const res = {
        status: sinon.stub().returnsThis(),
        send: sinon.stub().returnsArg(0)
      }
      const err = new Error('some error')

      let errorHandler = proxiquire('../../../middlewares/errorHandler', {
        '../lib/utils/logger': logger,
        '../config': config
      })

      const response = errorHandler(err, {}, res, () => {})

      res.send.should.have.been.calledOnce
      response.should.have.property('error').equal(err.message)
      response.should.have.property('stack').to.be.a('string')

      config.isProduction = sinon.stub().returns(true)

      errorHandler = proxiquire('../../../middlewares/errorHandler', {
        '../lib/utils/logger': logger,
        '../config': config
      })

      const prdResponse = errorHandler(err, {}, res, () => {})

      res.send.should.have.been.calledTwice
      prdResponse.should.have.property('error').equal(err.message)
      prdResponse.should.not.have.property('stack')
    })

    it('should only log non http errors', () => {
      const logger = {error: sinon.spy()}
      const res = {
        status: sinon.stub().returnsThis(),
        send: () => {}
      }
      const err = new HttpError('some error')

      let errorHandler = proxiquire('../../../middlewares/errorHandler', {
        '../lib/utils/logger': logger
      })

      errorHandler(err, {}, res, () => {})

      logger.error.should.not.have.been.called

      errorHandler(new Error(), {}, res, () => {})
      logger.error.should.have.been.called
    })
  })
}
