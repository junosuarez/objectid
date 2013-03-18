var chai = require('chai')
chai.should()
var expect = chai.expect

var objectId = require('./index')
var NativeObjectId = require('mongodb').ObjectID

describe('objectid', function () {
  it ('constructs and object', function () {
    objectId().should.be.an('object')
  })

  it('has a bsontype to work with the `bson` module', function () {
    var id = objectId()
    id._bsontype.should.equal('ObjectID');
  })

  it('JSON serializes to its id string', function () {
    var id = objectId()
    JSON.stringify(id).should.equal('"' + id.id + '"')
  })

  it('casts native driver ObjectIds', function () {
    var nativeOid = new NativeObjectId()
    var oid = objectId(nativeOid)
    oid.should.be.instanceof(objectId)
    oid.toString().should.equal(nativeOid.toString())
  })

  it ('casts itself to itself', function () {
    var oid = objectId()
    var oid2 = objectId(oid)
    oid2.should.be.instanceof(objectId)
    oid.toString().should.equal(oid2.toString())
  })

  it('returns the same object if casting an objectId', function () {
    var oid = objectId()
    var oid2 = objectId(oid)
    expect(oid === oid2).to.equal(true)
  })

  it('casts strings to objectIds', function () {
    var oid = '511083bb08ce6b1b00000003'
    var oid2 = objectId(oid)
    oid.should.equal(oid2.toString())
  })

  it('throws if called as a cast of an invalid objectid', function () {
    expect(function () {
      var oid = objectId('fsodfisohj')
    }).to.throw(/invalid/i)
  })

  describe('.isValid', function () {
    it('validates objectIds as 24 character hex strings', function () {
      objectId.isValid('foo').should.equal(false)
      objectId.isValid('511083bb08ce6b1b00000003').should.equal(true)
      objectId.isValid('sdf').should.equal(false)
      objectId.isValid(123).should.equal(false)
      objectId.isValid(null).should.equal(false)
      objectId.isValid({}).should.equal(false)
      objectId.isValid(['foo']).should.equal(false)
    })

    it('validates itself', function () {
      objectId.isValid(objectId()).should.equal(true)
    })

    it('validates mongo native driver ObjectIds', function () {
      objectId.isValid(new NativeObjectId).should.equal(true)
    })

  })

})


console.log('all tests pass')