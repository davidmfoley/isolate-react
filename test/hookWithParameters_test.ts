import { describe, it } from 'mocha'
import { expect } from 'chai'

import isolateHooks from '../src'
import { useState } from 'react'

describe('invoking a hook with parameters', () => {
  it('accepts the same parameters', () => {
    const usePassedValue = (value: number) => useState(value)
    const isolated = isolateHooks(usePassedValue)
    const [result] = isolated(2)
    expect(result).to.eq(2)
  })

  it('invokes the hook upon each call', () => {
    let count = 0

    const useCounter = () => {
      count++
    }

    const isolated = isolateHooks(useCounter)
    expect(count).to.eq(0)
    isolated()
    expect(count).to.eq(1)
    isolated()
    expect(count).to.eq(2)
  })
})
