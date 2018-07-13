'use strict';


var assert = require('assert');

/*eslint-env mocha*/

describe('api', function () {
  it('renderer', function () {
    var res = require('markdown-it')()
                .use(require('../'), 'spoiler', {
                  render: function (tokens, idx) {
                    return tokens[idx].nesting === 1
                         ? '<details><summary>click me</summary>\n'
                         : '</details>\n';
                  }
                })
                .render('::: spoiler\n*content*\n:::\n');

    assert.equal(res, '<details><summary>click me</summary>\n<p><em>content</em></p>\n</details>\n');
  });

  it('2 char marker', function () {
    var res = require('markdown-it')()
                .use(require('../'), 'spoiler', {
                  marker: '->'
                })
                .render('->->-> spoiler\n*content*\n->->->\n');

    assert.equal(res, '<div class="spoiler">\n<p><em>content</em></p>\n</div>\n');
  });

  it('marker should not collide with fence', function () {
    var res = require('markdown-it')()
                .use(require('../'), 'spoiler', {
                  marker: '`'
                })
                .render('``` spoiler\n*content*\n```\n');

    assert.equal(res, '<div class="spoiler">\n<p><em>content</em></p>\n</div>\n');
  });

  it('marker should not collide with fence #2', function () {
    var res = require('markdown-it')()
                .use(require('../'), 'spoiler', {
                  marker: '`'
                })
                .render('\n``` not spoiler\n*content*\n```\n');

    assert.equal(res, '<pre><code class="language-not">*content*\n</code></pre>\n');
  });

  describe('validator', function () {
    it('should skip rule if return value is falsy', function () {
      var res = require('markdown-it')()
                 .use(require('../'), 'name', {
                   validate: function () { return false; }
                 })
                 .render(':::foo\nbar\n:::\n');

      assert.equal(res, '<p>:::foo\nbar\n:::</p>\n');
    });

    it('should accept rule if return value is true', function () {
      var res = require('markdown-it')()
                 .use(require('../'), 'name', {
                   validate: function () { return true; }
                 })
                 .render(':::foo\nbar\n:::\n');

      assert.equal(res, '<div class="name">\n<p>bar</p>\n</div>\n');
    });

    it('rule should call it', function () {
      var count = 0;

      require('markdown-it')()
        .use(require('../'), 'name', {
          validate: function () { count++; }
        })
       .parse(':\n::\n:::\n::::\n:::::\n', {});

      // called by paragraph and lheading 3 times each
      assert(count > 0);
      assert(count % 3 === 0);
    });

    it('should not trim params', function () {
      require('markdown-it')()
        .use(require('../'), 'name', {
          validate: function (p) { assert.equal(p, ' \tname '); return 1; }
        })
       .parse('::: \tname \ncontent\n:::\n', {});
    });
  });
});
