var assert = require('assert');
var objectId = require('./index')
var ObjectId = require('mongodb').ObjectID

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

assert.ok(
  !objectId.isValid('sdf')
)

assert.ok(
  !objectId.isValid(123)
)

assert.ok(
  !objectId.isValid(null)
)

assert.ok(
  !objectId.isValid({})
)

assert.ok(
  !objectId.isValid(['foo'])
)

assert.ok(
  objectId.isValid(new ObjectId)
)

console.log('all tests pass')