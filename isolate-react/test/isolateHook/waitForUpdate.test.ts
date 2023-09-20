import assert from 'node:assert'
import { useEffect, useState } from 'react'
import { isolateHook } from '../../src'

describe('waitForUpdate', () => {
  it('is called when an update occurs', async () => {
    const useUpdateImmediate = () => {
      const [count, setCount] = useState(0)

      useEffect(() => {
        setTimeout(() => setCount((c) => c + 1), 1)
      }, [])

      return count
    }

    const isolated = isolateHook(useUpdateImmediate)
    assert.strictEqual(isolated(), 0)
    const updated = await isolated.waitForUpdate()
    assert.strictEqual(updated, 1)
    assert.strictEqual(isolated.currentValue(), 1)
  })

  it('is called when an update occurs', async () => {
    const useUpdateTwice = () => {
      const [count, setCount] = useState(0)

      useEffect(() => {
        setTimeout(() => setCount((c) => c + 1), 1)
        setTimeout(() => setCount((c) => c + 1), 2)
      }, [])

      return count
    }
    const isolated = isolateHook(useUpdateTwice)
    assert.strictEqual(isolated(), 0)

    const first = await isolated.waitForUpdate()
    assert.strictEqual(first, 1)
    assert.strictEqual(isolated.currentValue(), 1)

    const second = await isolated.waitForUpdate()
    assert.strictEqual(second, 2)
    assert.strictEqual(isolated.currentValue(), 2)
  })
})
