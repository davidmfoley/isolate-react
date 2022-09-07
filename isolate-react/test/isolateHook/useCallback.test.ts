import { describe, it } from 'mocha'
import assert from 'node:assert'
import { isolateHook } from '../../src/isolateHook'
import { useCallback, useState } from 'react'

describe('useCallback', () => {
  it('is stable with no deps', () => {
    const useCallbackExample = () => useCallback(() => {}, [])

    const isolated = isolateHook(useCallbackExample)
    const first = isolated()
    isolated()
    assert.strictEqual(first, isolated())
  })

  it('is a new instance when deps change', () => {
    let setValue: (v: number) => void

    const useCallbackExample = () => {
      const [val, setter] = useState(0)
      setValue = setter
      return useCallback(() => val, [val])
    }

    const isolated = isolateHook(useCallbackExample)
    const first = isolated()
    setValue(1)

    assert.notStrictEqual(first, isolated())
    assert.strictEqual(first(), 0)
    assert.strictEqual(isolated()(), 1)
  })

  it('is the same instance when deps do not change', () => {
    let setValue: (v: number) => void
    const useCallbackExample = () => {
      const [val, setter] = useState(0)
      setValue = setter
      return useCallback(() => val, [val])
    }

    const isolated = isolateHook(useCallbackExample)
    isolated()

    setValue(1)
    const first = isolated()
    setValue(1)
    assert.strictEqual(first(), 1)
    assert.strictEqual(isolated()(), 1)
    assert.strictEqual(first, isolated())
  })
})
