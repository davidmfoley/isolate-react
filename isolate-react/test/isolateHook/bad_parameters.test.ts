import { describe, it } from 'mocha'
import assert from 'node:assert'

import { isolateHook } from '../../src/isolateHook'

describe('handling common errors', () => {
  it('handles a null hook', () => {
    assert.throws(
      () => isolateHook(null),
      /Expected a hook function but got null/
    )
  })

  it('handles undefined hook', () => {
    assert.throws(
      () => isolateHook(undefined),
      /Expected a hook function but got undefined/
    )
  })

  it('handles non-function hook', () => {
    assert.throws(
      () => isolateHook(42 as any),
      /Expected a hook function but got number \(42\)/
    )
  })
})
