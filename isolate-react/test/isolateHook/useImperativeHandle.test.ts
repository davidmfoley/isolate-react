import { describe, it } from 'mocha'
import assert from 'node:assert'
import { isolateHook } from '../../src/isolateHook'
import { useImperativeHandle, useRef } from 'react'

describe('useImerativeHandle', () => {
  it("doesn't throw", () => {
    // todo: implement tracing, for now just no-op
    const useImperativeHandleExample = () => {
      const ref = useRef({})
      useImperativeHandle(ref, () => ({}), [])
      return 42
    }

    assert.equal(isolateHook(useImperativeHandleExample)(), 42)
  })
})
