import { describe, it } from 'mocha'
import assert from 'node:assert'

import { isolateHook } from '../../src/isolateHook'
import { useDeferredValue, useState } from 'react'

describe('useDeferredValue', () => {
  const useDeferredValueExample = () => {
    const [value] = useState(42)
    return useDeferredValue(value)
  }

  it('returns the value (for now)', () => {
    const hook = isolateHook(useDeferredValueExample)
    assert.equal(hook(), 42)
  })
})
