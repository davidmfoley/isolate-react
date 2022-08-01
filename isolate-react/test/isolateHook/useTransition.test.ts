import { describe, it } from 'mocha'

import { expect } from 'chai'

import { isolateHook } from '../../src/isolateHook'
import { useTransition } from 'react'

describe('useTransition', () => {
  const useTransitionExample = () => useTransition()
  it('is never pending (for now)', () => {
    const hook = isolateHook(useTransitionExample)
    expect(hook()[0]).to.eq(false)
  })

  it('immediately transitions (for now)', () => {
    const hook = isolateHook(useTransitionExample)
    const [_, start] = hook()
    let invoked = false
    start(() => {
      invoked = true
    })
    expect(invoked).to.eq(true)
  })
})
