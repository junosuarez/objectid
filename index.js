var inherits = require('util').inherits
var ObjectId = require('bson').ObjectId
var toString = require('to-string')

ObjectId.prototype.equals = function (oidB) {
  return equals(this, oidB)
}

var objIdPattern = /^[0-9a-fA-F]{24}$/;
var isValid = function (alleged) {
  return (!!alleged && objIdPattern.test(toString(alleged)))
}

var equals = function (oidA, oidB) {
  // curried
  if (arguments.length === 1) {
    return function (oidB) {
      return equals(oidA, oidB)
    }
  }

  if (oidA === oidB) { return true; }
  if (!oidA || !oidB) { return false }
  return (oidA.toString() === oidB.toString())
  return false;
}

var tryParse = function (oid, out, as) {
  if (!isValid(oid)) { return false }
  try {
    out[as] = Id(oid)
    return true
  } catch (e) {
    return false
  }
}

function Id(id) {
  if (id instanceof ObjectId) { return id }
  id = toString(id)

  if (id) {
    if (isValid(id)) {
      return new ObjectId(id)

    } else {
      throw new Error('Invalid ObjectId: ' + id)
    }
  } else {
    return new ObjectId()
  }

}

module.exports = Id;
module.exports.constructor = ObjectId;
module.exports.tryParse = tryParse;
module.exports.equals = equals;
module.exports.isValid = isValid;