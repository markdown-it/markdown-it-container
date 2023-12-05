'use strict'
/* eslint-env mocha */

const assert = require('node:assert')
const fn = require('../')

describe('CJS', () => {
  it('require', () => {
    assert.ok(typeof fn === 'function')
  })
})
