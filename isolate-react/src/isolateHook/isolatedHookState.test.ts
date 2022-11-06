import { describe, test } from 'mocha'
import assert from 'node:assert'
import createIsolatedHookState from './isolatedHookState'
import { HookStateDef } from './updatableHookStates'

const exampleHookStateOptions = {
  type: 'useMemo',
  create: () => ({}),
} as HookStateDef<any>

describe('isolatedHookState', () => {
  describe('invokeWhileDirty', () => {
    test('state is stable', () => {
      let firstPassState: any
      const isolatedHookState = createIsolatedHookState({})
      isolatedHookState.invokeWhileDirty(() => {
        firstPassState = isolatedHookState.nextHookState(
          exampleHookStateOptions
        )
      })

      isolatedHookState.invokeWhileDirty(() => {
        const secondPassState = isolatedHookState.nextHookState(
          exampleHookStateOptions
        )
        assert.strictEqual(secondPassState, firstPassState)
      })
    })

    test('state is stable when error occurs', () => {
      let firstPassState: any
      const isolatedHookState = createIsolatedHookState({})

      try {
        isolatedHookState.invokeWhileDirty(() => {
          firstPassState = isolatedHookState.nextHookState(
            exampleHookStateOptions
          )
          throw new Error('test')
        })
      } catch (e) {}

      isolatedHookState.invokeWhileDirty(() => {
        const secondPassState = isolatedHookState.nextHookState(
          exampleHookStateOptions
        )
        assert.strictEqual(secondPassState, firstPassState)
      })
    })
  })
})
