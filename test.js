var assert = require('assert');
var objectId = require('./index')

assert.ok(
  objectId.isValid(objectId())
)

assert.ok(
  typeof objectId() === 'string'
)

assert.ok(
  !objectId.isValid('foo')
)

assert.ok(
  objectId.isValid('511083bb08ce6b1b00000003')
)


console.log('all tests pass')