var $3_BITS = 0xFFFFFF;
var $5_BITS = 0xFFFFFFFFFF;

var MACHINE_ID_AND_PID = Math.round(Math.random() * $5_BITS);
var index = 0;

var Index = function () {
  index = index + 1 % $3_BITS;
  return index;
};

var Timestamp = function () {
  return Math.floor((new Date()) / 1000);
};

var pad = function (val, pad) {
  while (val.length < pad) {
    val = '0' + val;
  }
  return val;
};

var ObjectId = function (id) {
  if (id && id instanceof ObjectId) {
    return id;
  }
  if (!(this instanceof ObjectId)) {
    return new ObjectId(id);
  }

  if (id) {
    id = id.toString()
    if (isValid(id)) {
      this.id = id;
    } else {
      throw new Error('Invalid ObjectId: ' + id)
    }
  } else {
    this.id = make();
  }

};

var make = function () {
    /* ObjectIds
   * 24 character hex strings of 12 byte objects
   * 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | A | B
   * Timestamp     | Machine   | PID   | Index
   * Since we're running in a browser, we just use random values
   * for Machine and PID
   */

  var groups = [ // [value, padding in hex (bytes * 2)]
    [Timestamp(), 8],
    [MACHINE_ID_AND_PID, 10],
    [Index(), 6]
  ];

  var str = groups.reduce(function (id, group) {
    return id + pad(group[0].toString(16), group[1]);
  }, '');

  return str;
}

ObjectId.prototype._bsontype = 'ObjectID';
ObjectId.prototype.toString = function () {
  return this.id;
}

ObjectId.prototype.toJSON = function () {
  return this.id;
}

var objIdPattern = /^[0-9a-fA-F]{24}$/;
var isValid = function (alleged) {
  return (!!alleged &&
          typeof alleged.toString === 'function' &&
          objIdPattern.test(alleged.toString())
        )
};

module.exports = ObjectId;
module.exports.isValid = isValid;