import { describe, test } from 'mocha'
import { createUpdatableHookStates } from './updatableHookStates'
import assert from 'node:assert'

describe('updatableHookStates', () => {
  test('nextHookState constructs initial state', () => {
    const states = createUpdatableHookStates()
    const [{ value }] = states.nextHookState({
      type: 'useState',
      create: () => 42,
    })
    assert.strictEqual(value, 42)
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

    assert.strictEqual(first, second)
  })
})
