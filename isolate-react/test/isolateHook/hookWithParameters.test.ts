import { describe, it } from 'mocha'
import assert from 'node:assert'
import { isolateHook } from '../../src/isolateHook'
import { useState } from 'react'

describe('invoking a hook with parameters', () => {
  it('accepts the same parameters', () => {
    const usePassedValue = (value: number) => useState(value)
    const isolated = isolateHook(usePassedValue)
    const [result] = isolated(2)
    assert.strictEqual(result, 2)
  })

  it('invokes the hook upon each call', () => {
    let count = 0

    const useCounter = () => {
      count++
    }

    const isolated = isolateHook(useCounter)
    assert.strictEqual(count, 0)
    isolated()
    assert.strictEqual(count, 1)
    isolated()
    assert.strictEqual(count, 2)
  })

  it('maintains parameter values on subsequent invocations', () => {
    let setter: any = () => {}
    let lastValue = 0

    const usePassedValue = (value: number) => {
      const [val, setVal] = useState(value)
      setter = setVal
      lastValue = value
      return value
    }
    isolateHook(usePassedValue)(2)
    setter(42)
    assert.strictEqual(lastValue, 2)
  })
})
