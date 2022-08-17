import { expect } from 'chai'
import { describe, test } from 'mocha'
import { createUpdatableHookStates } from './updatableHookStates'

describe('updatableHookStates', () => {
  test('nextHookState constructs initial state', () => {
    const states = createUpdatableHookStates()
    const [{ value }] = states.nextHookState({
      type: 'useState',
      create: () => 42,
    })
    expect(value).to.eq(42)
  })

  test('update function is sable', () => {
    const states = createUpdatableHookStates()
    const [, first] = states.nextHookState({
      type: 'useState',
      create: () => 42,
    })
    states.endPass()

    const [, second] = states.nextHookState({
      type: 'useState',
      create: () => 42,
    })

    expect(first).to.eq(second)
  })
})
