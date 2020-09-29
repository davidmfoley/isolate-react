import { describe, it } from 'mocha'
import { expect } from 'chai'

import isolateHooks from '../src'
import { useImperativeHandle, useRef } from 'react'

describe('useDebugValue', () => {
  it("doesn't throw", () => {
    // todo: implement tracing, for now just no-op
    const useImperativeHandleExample = () => {
      const ref = useRef({})
      useImperativeHandle(ref, () => ({}), [])
      return 42
    }

    expect(isolateHooks(useImperativeHandleExample).currentValue()).to.eq(42)
  })
})
