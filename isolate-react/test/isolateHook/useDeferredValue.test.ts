import { describe, it } from 'mocha'

import { expect } from 'chai'

import { isolateHook } from '../../src/isolateHook'
import { useDeferredValue, useState } from 'react'

describe('useDeferredValue', () => {
  const useDeferredValueExample = () => {
    const [value] = useState(42)
    return useDeferredValue(value)
  }

  it('returns the value (for now)', () => {
    const hook = isolateHook(useDeferredValueExample)
    expect(hook()).to.eq(42)
  })
})
