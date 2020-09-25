import { createEffectSet } from './effectSet'
export type IsolatedHookState = ReturnType<typeof createIsolatedHookState>

type HookState<T> = [{ value: T }, (value: T) => void]

export const createIsolatedHookState = () => {
  let dirty = false
  let first = true

  let hookStates: any[] = []
  let nextHookStates: any[] = []

  const layoutEffects = createEffectSet()
  const effects = createEffectSet()

  let onUpdated = () => {}

  const updater = (target: any) => (nextValue: any) => {
    target.value = nextValue
    if (!dirty) {
      dirty = true
      onUpdated()
    }
  }

  const addHookState = <T>(value: T): HookState<T> => {
    let newState = { value }
    nextHookStates.push(newState)
    return [newState, updater(newState)]
  }

  const nextHookState = <T>(factory: (() => T) | undefined): HookState<T> => {
    if (first) return addHookState(factory())
    let state = { ...hookStates.shift() }
    nextHookStates.push(state)
    return [state, updater(state)]
  }

  const endPass = () => {
    dirty = false
    first = false

    layoutEffects.flush()
    effects.flush()

    hookStates = nextHookStates
  }

  return {
    layoutEffects,
    effects,
    endPass,
    nextHookState,
    firstPass: () => first,
    dirty: () => dirty,
    onUpdated: (handler: () => void) => {
      onUpdated = handler
    },
    cleanup: () => {
      layoutEffects.cleanup()
      effects.cleanup()
    },
  }
}
