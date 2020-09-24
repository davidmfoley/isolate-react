import React from 'react'
type SetState<T> = React.Dispatch<React.SetStateAction<T>>

interface Dispatcher {
  useState: typeof React.useState
  useEffect: typeof React.useEffect
  onUpdated: (Function) => void
  startPass: () => void
  endPass: () => void
  dirty: () => boolean
}

type HookState<T> = [{ value: T }, (value: T) => void]

export const createIsolatedDispatcher = () => {
  let first = true
  let dirty = false

  let hookStates: any[] = []
  let nextHookStates: any[] = []
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

  const useState = <T>(
    initialState: T | (() => T)
  ): [state: T, setter: SetState<T>] => {
    const [state, updateState] = first
      ? addHookState(
          typeof initialState === 'function'
            ? (initialState as any)()
            : initialState
        )
      : nextHookState()

    return [state.value, updateState]
  }
  type Deps = any[] | undefined
  type EffectState = { deps: Deps; cleanup?: Function }

  const dirtyDeps = (a: Deps, b: Deps) => {
    if (a === undefined && b === undefined) return true
    if (a === [] && b === []) return false
    return a.some((value, i) => !Object.is(value, b[i]))
  }

  const pendingUseEffects = []

  const flushEffects = (effects) => {
    while (effects.length) {
      const next = effects.shift()
      if (next.state.value.cleanup) next.state.value.cleanup()
      next.state.value.cleanup = next.effect()
    }
  }

  const useEffectHandler = (queue: any[]) => (
    effect: () => (() => void) | undefined,
    deps: Deps
  ) => {
    if (first) {
      const [state] = addHookState<EffectState>({ deps })
      queue.push({ effect, state })
    } else {
      const [state] = nextHookState<EffectState>()

      if (dirtyDeps(state.value.deps, deps)) {
        queue.push({ effect, state })
        state.value.deps = [...deps]
      }
    }
  }

  const useEffect = useEffectHandler(pendingUseEffects)

  const startPass = () => {}

  const endPass = () => {
    first = false
    dirty = false
    flushEffects(pendingUseEffects)
    hookStates = nextHookStates
  }

  return {
    useEffect: useEffect as any,
    useState: useState as any,
    onUpdated: (fn: () => void) => {
      onUpdated = fn
    },
    startPass,
    endPass,
    dirty: () => dirty,
  }
}
