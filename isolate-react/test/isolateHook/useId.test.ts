import { describe, it } from 'mocha'
import assert from 'node:assert'

import { isolateHook } from '../../src/isolateHook'
import { useId } from 'react'

describe('useId', () => {
  const useIdExample = () => [useId(), useId()]

  it('returns unique string ids', () => {
    const hook = isolateHook(useIdExample)
    const ids = hook()

    assert.strictEqual(typeof ids[0], 'string')
    assert.strictEqual(typeof ids[1], 'string')

    assert.notStrictEqual(ids[0], ids[1])
  })

  it('returns ids that are stable between invocations', () => {
    const hook = isolateHook(useIdExample)
    const first = hook()

    const second = hook()

    assert.strictEqual(first[0], second[0])
    assert.strictEqual(first[1], second[1])
  })

  it('returns ids that are different on each invocation', () => {
    // we don't attempt to make ids deterministic
    // but we do want to have unique ids when there are multiple hooks
    // invoked due to inlining components in a test
    const oneHook = isolateHook(useIdExample)
    const anotherHook = isolateHook(useIdExample)

    const ids = oneHook()
    const otherIds = anotherHook()

    assert.equal(new Set([...ids, ...otherIds]).size, 4)
  })
})
