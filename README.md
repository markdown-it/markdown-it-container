# markdown-it-container

[![Build Status](https://img.shields.io/travis/markdown-it/markdown-it-container/master.svg?style=flat)](https://travis-ci.org/markdown-it/markdown-it-container)
[![NPM version](https://img.shields.io/npm/v/markdown-it-container.svg?style=flat)](https://www.npmjs.org/package/markdown-it-container)
[![Coverage Status](https://img.shields.io/coveralls/markdown-it/markdown-it-container/master.svg?style=flat)](https://coveralls.io/r/markdown-it/markdown-it-container?branch=master)

> Plugin for creating block-level custom containers for [markdown-it](https://github.com/markdown-it/markdown-it) markdown parser.

__v2.+ requires `markdown-it` v5.+, see changelog.__

With this plugin you can create block containers like:

```
::: warning
*here be dragons*
:::
```

.... and specify how they should be rendered. If no renderer defined, `<div>` with
container name class will be created:

```html
<div class="warning">
<em>here be dragons</em>
</div>
```

Markup is the same as for [fenced code blocks](http://spec.commonmark.org/0.18/#fenced-code-blocks).
Difference is, that marker use another character and content is rendered as markdown markup.


## Installation

node.js, browser:

```bash
$ npm install markdown-it-container --save
$ bower install markdown-it-container --save
```


## API

```js
var md = require('markdown-it')()
            .use(require('markdown-it-container'), name [, options]);
```

Params:

- __name__ - container name (mandatory)
- __options:__
   - __validate__ - optional, function to validate tail after opening marker, should
     return `true` on success.
   - __render__ - optional, renderer function for opening/closing tokens.
   - __marker__ - optional (`:`), character to use in delimiter.


## Example

```js
var md = require('markdown-it')();

md.use(require('markdown-it-container'), 'spoiler', {

  validate: function(params) {
    return params.trim().match(/^spoiler\s+(.*)$/);
  },

  render: function (tokens, idx) {
    var m = tokens[idx].info.trim().match(/^spoiler\s+(.*)$/);

    if (tokens[idx].nesting === 1) {
      // opening tag
      return '<details><summary>' + md.utils.escapeHtml(m[1]) + '</summary>\n';

    } else {
      // closing tag
      return '</details>\n';
    }
  }
});

console.log(md.render('::: spoiler click me\n*content*\n:::\n'));

// Output:
//
// <details><summary>click me</summary>
// <p><em>content</em></p>
// </details>
```

## Example with markdown-it-decorate
then you can use [markdown-it-decorate](https://github.com/rstacruz/markdown-it-decorate) syntax like '#my-id.my-class title="hello"'

```js
var md = require('markdown-it')();

md.use(require('markdown-it-decorate'))
  .use(require('markdown-it-container'), 'decorate' , {
            validate: function(params) {
                return params.trim().match(/^(.*)$/);
            },

            render: function (tokens, idx) {
                var m = tokens[idx].info.trim().match(/^(.*)$/);

                if (tokens[idx].nesting === 1) {
                    // opening tag
                    var fake=md.render('TMP_FOR_CONTAINER<!-- {'+ m[1]+'} -->')
console.log(fake)
                    return '<div '+ fake.substring(3,  fake.indexOf('>'))+'>\n';

                } else {
                    // closing tag
                    return '</div>\n';
                }
            }
   })
  

console.log(md.render('::: #n.ok title=hello\nccc\n:::'));

// Output:
// <div id="n" class="ok" title="hello">
// <p>ccc</p>
// </div>

```

## License

[MIT](https://github.com/markdown-it/markdown-it-container/blob/master/LICENSE)
