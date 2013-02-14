# objectid
generate and validate mongodb objectId strings without dependencies

## about

one of the best parts about using objectIds in mongodb is being able to generate them at object creation time, rather than at database insert time. This module is super convenient for code when you don't want the full mongodb driver as a dependency, for example, for use with browserify.

## installation

    $ npm install objectid

## usage

    var objectid = require('objectid')

    var id = objectid()
    // =>

    objectid.isValid(id)
    // => true

    objectid.isValid('4frsdef43wzx')
    // => false

New in version 1.1, `objectid.isValid` returns true for `mongodb` native driver `ObjectID` objects, or any other representations with a `.toString` method which returns the hex string encoding of a valid objectid.

## running the tests

    $ npm test

## contributors

jden <jason@denizac.org> @leJDen

## license

MIT. (c) 2013 Agile Diagnosis <hello@agilediagnosis.com> See LICENSE.md