# objectid
generate and validate mongodb objectId strings without dependencies

## about

one of the best parts about using objectIds in mongodb is being able to generate them at object creation time, rather than at database insert time. This module is super convenient for code when you don't want the full mongodb driver as a dependency, for example, for use with browserify.

New in 2.x, this module returns objects with the `_bsontype` property set properly to be treated as BSON ObjectIDs, eg, for use in the native driver.

## installation

    $ npm install objectid

## usage

    var objectid = require('objectid')

    var id = objectid()

    objectid.isValid(id)
    // => true

    objectid.isValid('4frsdef43wzx')
    // => false

`objectid.isValid` returns true for `mongodb` native driver `ObjectID` objects, or any other representations with a `.toString` method which returns the hex string encoding of a valid objectid.

Calling `objectid` with an existing objectid - whether a string, an object created by this module, an objectid created by another driver (such as the result of a query) - will cast the value to an instanceof this module. It will throw if the argument is not a valid ObjectId.

## running the tests

    $ npm test

## contributors

jden <jason@denizac.org> @leJDen

## license

MIT. (c) 2013 Agile Diagnosis <hello@agilediagnosis.com> See LICENSE.md