import { describe, it } from 'mocha'
import assert from 'node:assert'
import { isolateHook } from '../../src/isolateHook'
import { useEffect, useState } from 'react'

describe('built in hooks', () => {
  // examples of isolating hooks directly
  it('supports useState', () => {
    const isolatedUseState = isolateHook(useState)
    const [person, setPerson] = isolatedUseState('arthur')
    assert.strictEqual(person, 'arthur')
    setPerson('trillian')

    const [updated] = isolatedUseState('arthur')
    assert.strictEqual(updated, 'trillian')
  })

  it('supports useEffect', () => {
    const actions: string[] = []
    const isolatedUseEffect = isolateHook(useEffect)

    isolatedUseEffect(() => {
      actions.push('effect')
      return () => {
        actions.push('cleanup')
      }
    }, [])

    assert.deepEqual(actions, ['effect'])

    isolatedUseEffect.cleanup()

    assert.deepEqual(actions, ['effect', 'cleanup'])
  })
})
