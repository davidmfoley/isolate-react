import { expect } from 'chai'
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
    expect(isolated()).to.eq(0)
    await isolated.waitForUpdate()
    expect(isolated.currentValue()).to.eq(1)
  })
})
