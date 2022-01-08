import { describe, it } from 'mocha'
import { expect } from 'chai'

import isolateHooks from '../src'
import { useEffect, useState } from 'react'

describe('built in hooks', () => {
  // examples of isolating hooks directly
  it('supports useState', () => {
    const isolatedUseState = isolateHooks(useState)
    const [person, setPerson] = isolatedUseState('arthur')
    expect(person).to.eq('arthur')
    setPerson('trillian')

    const [updated] = isolatedUseState('arthur')
    expect(updated).to.eq('trillian')
  })

  it('supports useEffect', () => {
    const actions: string[] = []
    const isolatedUseEffect = isolateHooks(useEffect)

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
