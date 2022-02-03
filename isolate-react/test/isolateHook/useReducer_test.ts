import { describe, it } from 'mocha'
import { expect } from 'chai'

import { isolateHook } from '../../src/isolateHook'
import { useReducer } from 'react'

describe('useReducer', () => {
  const counter = (state: number, action: '0' | '++' | '--') => {
    if (action === '0') return 0
    if (action === '++') return state + 1
    return state - 1
  }

  it('has initial value', () => {
    const isolated = isolateHook(() => useReducer(counter, 0))
    const [count] = isolated()
    expect(count).to.eq(0)
  })

  it('handles dispatch', () => {
    const isolated = isolateHook(() => useReducer(counter, 0))
    const [_, dispatch] = isolated()
    dispatch('++')
    dispatch('++')
    dispatch('++')
    dispatch('--')
    dispatch('++')

    const [count] = isolated()
    expect(count).to.eq(3)
  })
})
