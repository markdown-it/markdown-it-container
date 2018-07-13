'use strict';


var assert = require('assert');

/*eslint-env mocha*/

describe('coverage', function () {
  it('marker coverage', function () {
    var tok = require('markdown-it')()
                .use(require('../'), 'fox', {
                  marker: 'foo',
                  validate: function (p) { assert.equal(p, 'fox'); return 1; }
                })
                .parse('foofoofoofox\ncontent\nfoofoofoofoo\n');

    assert.equal(tok[0].markup, 'foofoofoo');
    assert.equal(tok[0].info, 'fox');
    assert.equal(tok[4].markup, 'foofoofoofoo');
  });
});
