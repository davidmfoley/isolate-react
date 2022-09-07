import { describe, it } from 'mocha'
import assert from 'node:assert'
import { isolateHook } from '../../src/isolateHook'
import { useDebugValue } from 'react'

describe('useDebugValue', () => {
  it("doesn't throw", () => {
    // todo: implement tracing, for now just no-op
    const useDebugValueExample = () => {
      useDebugValue('heart of gold')
      return 42
    }

    const isolated = isolateHook(useDebugValueExample)
    assert.strictEqual(isolated(), 42)
  })
})
