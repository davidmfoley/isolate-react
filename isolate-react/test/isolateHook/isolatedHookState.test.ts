import { expect } from 'chai'
import { describe, test } from 'mocha'
import createIsolatedHookState from '../../src/isolateHook/isolatedHookState'

describe('isolatedHookState', () => {
  test('nextHookState constructs initial state', () => {
    const isolatedHookState = createIsolatedHookState({})
    const [{ value }] = isolatedHookState.nextHookState({
      type: 'useState',
      create: () => 42,
    })
    expect(value).to.eq(42)
  })

  test('update function is stable', () => {
    const isolatedHookState = createIsolatedHookState({})
    const [, first] = isolatedHookState.nextHookState({
      type: 'useState',
      create: () => 42,
    })
    isolatedHookState.endPass()

    const [, second] = isolatedHookState.nextHookState({
      type: 'useState',
      create: () => 42,
    })

    expect(first).to.eq(second)
  })
})
