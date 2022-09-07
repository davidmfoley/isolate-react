import assert from 'node:assert'
import { useEffect, useState } from 'react'
import { isolateHook } from '../../src'

describe('waitForUpdate', () => {
  const useUpdateImmediate = () => {
    const [count, setCount] = useState(0)

    useEffect(() => {
      setTimeout(() => setCount((c) => c + 1), 1)
    }, [])

    return count
  }

  it('is called when an update occurs', async () => {
    const isolated = isolateHook(useUpdateImmediate)
    assert.strictEqual(isolated(), 0)
    const updated = await isolated.waitForUpdate()
    assert.strictEqual(updated, 1)
    assert.strictEqual(isolated.currentValue(), 1)
  })
})
