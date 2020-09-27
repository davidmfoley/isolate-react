import { describe, it, beforeEach, afterEach } from 'mocha'
import { expect } from 'chai'

import { testInIsolation } from '../src'
import { useReducer } from 'react'

describe('useReducer', () => {
  const counter = (state: number, action: '0' | '++' | '--') => {
    if (action === '0') return 0
    if (action === '++') return state + 1
    return state - 1
  }

  it('has initial value', () => {
    const isolated = testInIsolation(() => useReducer(counter, 0))
    const [count] = isolated.currentValue()
    expect(count).to.eq(0)
  })

  it('handles dispatch', () => {
    const isolated = testInIsolation(() => useReducer(counter, 0))
    const [_, dispatch] = isolated.currentValue()
    dispatch('++')
    dispatch('++')
    dispatch('++')
    dispatch('--')
    dispatch('++')

    const [count] = isolated.currentValue()
    expect(count).to.eq(3)
  })
})
