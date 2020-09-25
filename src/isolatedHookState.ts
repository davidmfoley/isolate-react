export type IsolatedHookState = ReturnType<typeof createIsolatedHookState>

type HookState<T> = [{ value: T }, (value: T) => void]

export const createIsolatedHookState = () => {
  let dirty = false
  let first = true

  let hookStates: any[] = []
  let nextHookStates: any[] = []
  const pendingUseEffects = []
  const pendingUseLayoutEffects = []

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

  const nextHookState = <T>(): HookState<T> => {
    let state = { ...hookStates.shift() }
    nextHookStates.push(state)
    return [state, updater(state)]
  }

  const flushEffects = (effects) => {
    while (effects.length) {
      const next = effects.shift()
      if (next.state.value.cleanup) next.state.value.cleanup()
      next.state.value.cleanup = next.effect()
    }
  }

  const endPass = () => {
    dirty = false
    first = false
    flushEffects(pendingUseLayoutEffects)
    flushEffects(pendingUseEffects)
    hookStates = nextHookStates
  }

  return {
    pendingUseLayoutEffects,
    pendingUseEffects,
    endPass,
    addHookState,
    nextHookState,
    firstPass: () => first,
    dirty: () => dirty,
    onUpdated: (handler: () => void) => {
      onUpdated = handler
    },
    cleanup: () => {
      hookStates.forEach((state) => {
        if (typeof state.value.cleanup === 'function') {
          state.value.cleanup()
        }
      })
    },
  }
}
