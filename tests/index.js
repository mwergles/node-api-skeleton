const functionalTestSuite = require('./functional')
const unitTestSuite = require('./unit')

describe('Functional test suite', () => {
  functionalTestSuite()
})

describe('Unit Test Suite', () => {
  unitTestSuite()
})
