import { describe, it } from 'mocha'
import { expect } from 'chai'

import isolateHook from '../src'
import { useDebugValue } from 'react'

describe('useDebugValue', () => {
  it("doesn't throw", () => {
    // todo: implement tracing, for now just no-op
    const useDebugValueExample = () => {
      useDebugValue('heart of gold')
      return 42
    }

    const isolated = isolateHook(useDebugValueExample)
    expect(isolated()).to.eq(42)
  })
})
