import { describe, it } from 'mocha'
import assert from 'node:assert'

import { isolateHook } from '../../src/isolateHook'
import { useTransition } from 'react'

describe('useTransition', () => {
  const useTransitionExample = () => useTransition()
  it('is never pending (for now)', () => {
    const hook = isolateHook(useTransitionExample)
    assert.strictEqual(hook()[0], false)
  })

  it('immediately transitions (for now)', () => {
    const hook = isolateHook(useTransitionExample)
    const [_, start] = hook()
    let invoked = false
    start(() => {
      invoked = true
    })
    assert.strictEqual(invoked, true)
  })
})
