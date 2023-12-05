import assert from 'node:assert'
import markdownit from 'markdown-it'

import container from '../index.mjs'

describe('coverage', function () {
  it('marker coverage', function () {
    const tok = markdownit()
      .use(container, 'fox', {
        marker: 'foo',
        validate: function (p) { assert.equal(p, 'fox'); return 1 }
      })
      .parse('foofoofoofox\ncontent\nfoofoofoofoo\n')

    assert.equal(tok[0].markup, 'foofoofoo')
    assert.equal(tok[0].info, 'fox')
    assert.equal(tok[4].markup, 'foofoofoofoo')
  })
})
