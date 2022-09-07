import { describe, it } from 'mocha'
import assert from 'node:assert'
import { isolateHook } from '../../src/isolateHook'
import { useMemo } from 'react'

describe('useMemo', () => {
  it('is computed first time', () => {
    let count = 0

    const useMemoExample = () =>
      useMemo(() => {
        count++
        return count
      }, [])

    const isolated = isolateHook(useMemoExample)
    assert.strictEqual(isolated(), 1)
  })

  it('is not computed on next render if deps unchanged', () => {
    let count = 0

    const useMemoExample = () =>
      useMemo(() => {
        count++
        return count
      }, [])

    const isolated = isolateHook(useMemoExample)
    assert.strictEqual(isolated(), 1)
  })

  it('is not computed on next render if deps unchanged', () => {
    let count = 0

    const useMemoExample = () =>
      useMemo(() => {
        count++
        return count
      }, [count])

    const isolated = isolateHook(useMemoExample)
    isolated()
    assert.strictEqual(isolated(), 2)
  })
})
