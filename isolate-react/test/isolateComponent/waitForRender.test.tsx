import React, { useEffect, useState } from 'react'
import { describe, it } from 'mocha'
import { expect } from 'chai'
import { isolateComponent } from '../../src/isolateComponent'

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

    expect(isolated.toString()).to.eq('<div>0</div>')
    await isolated.waitForRender()
    expect(isolated.toString()).to.eq('<div>1</div>')
  })
})
