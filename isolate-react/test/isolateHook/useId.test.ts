import { describe, it } from 'mocha'

import { expect } from 'chai'

import { isolateHook } from '../../src/isolateHook'
import { useId } from 'react'

describe('useId', () => {
  const useIdExample = () => [useId(), useId()]

  it('returns unique string ids', () => {
    const hook = isolateHook(useIdExample)
    const ids = hook()

    expect(typeof ids[0]).to.eq('string')
    expect(typeof ids[1]).to.eq('string')

    expect(ids[0]).not.to.eq(ids[1])
  })

  it('returns ids that are stable between invocations', () => {
    const hook = isolateHook(useIdExample)
    const first = hook()

    const second = hook()

    expect(first[0]).to.eq(second[0])
    expect(first[1]).to.eq(second[1])
  })

  it('returns ids that are different on each invocation', () => {
    // we don't attempt to make ids deterministic
    // but we do want to have unique ids when there are multiple hooks
    // invoked due to inlining components in a test
    const oneHook = isolateHook(useIdExample)
    const anotherHook = isolateHook(useIdExample)

    const ids = oneHook()
    const otherIds = anotherHook()

    expect(new Set([...ids, ...otherIds])).to.have.lengthOf(4)
  })
})
