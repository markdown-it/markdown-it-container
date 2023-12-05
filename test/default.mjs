import { fileURLToPath } from 'node:url'
import markdownit from 'markdown-it'
import generate from 'markdown-it-testgen'

import container from '../index.mjs'

/* eslint-env mocha */

describe('default container', function () {
  const md = markdownit().use(container, 'name')

  generate(fileURLToPath(new URL('fixtures/default.txt', import.meta.url)), md)
})
