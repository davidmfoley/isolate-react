import { describe, it } from 'mocha'
import { expect } from 'chai'

import isolateHook from '../../src/isolateHook'
import { useEffect, useState } from 'react'

describe('built in hooks', () => {
  // examples of isolating hooks directly
  it('supports useState', () => {
    const isolatedUseState = isolateHook(useState)
    const [person, setPerson] = isolatedUseState('arthur')
    expect(person).to.eq('arthur')
    setPerson('trillian')

    const [updated] = isolatedUseState('arthur')
    expect(updated).to.eq('trillian')
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

    expect(actions).to.eql(['effect'])

    isolatedUseEffect.cleanup()

    expect(actions).to.eql(['effect', 'cleanup'])
  })
})
