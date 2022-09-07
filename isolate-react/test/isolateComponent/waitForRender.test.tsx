import React, { useEffect, useState } from 'react'
import { describe, it } from 'mocha'
import { isolateComponent } from '../../src/isolateComponent'
import assert from 'node:assert'

const DelayedUpdate = () => {
  const [count, setCount] = useState(0)

  useEffect(() => {
    setTimeout(() => setCount((c) => c + 1), 1)
  }, [])

  return <div>{count}</div>
}

describe('waitForRender', () => {
  it('can render', async () => {
    const isolated = isolateComponent(<DelayedUpdate />)

    assert.strictEqual(isolated.toString(), '<div>0</div>')
    await isolated.waitForRender()
    assert.strictEqual(isolated.toString(), '<div>1</div>')
  })
})
