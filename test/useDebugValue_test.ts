import { describe, it } from 'mocha'
import { expect } from 'chai'

import { testInIsolation } from '../src'
import { useDebugValue } from 'react'

describe('useDebugValue', () => {
  it("doesn't throw", () => {
    // todo: implement tracing, for now just no-op
    const useDebugValueExample = () => {
      useDebugValue('heart of gold')
      return 42
    }

    expect(testInIsolation(useDebugValueExample).currentValue()).to.eq(42)
  })
})
