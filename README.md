# markdown-it-container

[![Build Status](https://img.shields.io/travis/markdown-it/markdown-it-container/master.svg?style=flat)](https://travis-ci.org/markdown-it/markdown-it-container)
[![NPM version](https://img.shields.io/npm/v/markdown-it-container.svg?style=flat)](https://www.npmjs.org/package/markdown-it-container)
[![Coverage Status](https://img.shields.io/coveralls/markdown-it/markdown-it-container/master.svg?style=flat)](https://coveralls.io/r/markdown-it/markdown-it-container?branch=master)

> Plugin for creating block-level custom containers for [markdown-it](https://github.com/markdown-it/markdown-it) markdown parser.

With this plugin you can create containers like:

```
::: warning
*here be dragons*
:::
```

And specify how they should be rendered.

## Installation

node.js, browser:

```bash
$ npm install markdown-it-container --save
$ bower install markdown-it-container --save
```

## API

```js
var md = require('markdown-it')();
var container = require('markdown-it-container');
md.use(container, name [, options]);
```

 - __name__ (String) - the name of the rule

 - __options__

   - __marker__ (String, default=":") - a character used to determine where
     the block starts and ends. Three or more markers will start the block.

   - __validate__ (Function) - function used to validate infostring (that's
     the thing after marker), it should return boolean value depending on 
     whether it's a valid tag or not.

   - __render__ (Function) - function used to render output, it works like
     all the other markdown-it renders.

## Example

```js
var md = require('markdown-it')();

md.use(require('markdown-it-container'), 'spoiler', {
  marker: ':',

  validate: function(params) {
    return params.trim().match(/^spoiler\s+(.*)$/);
  },

  render: function (tokens, idx) {
    var m = tokens[idx].info.trim().match(/^spoiler\s+(.*)$/);

    if (tokens[idx].nesting === 1) {
      // opening tag
      return '<details><summary>' + m[1] + '</summary>\n';

    } else if (tokens[idx].nesting === -1) {
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

## License

[MIT](https://github.com/markdown-it/markdown-it-container/blob/master/LICENSE)
