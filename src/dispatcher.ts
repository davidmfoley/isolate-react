import React from 'react'
import { IsolatedHookState } from './isolatedHookState'

type SetState<T> = React.Dispatch<React.SetStateAction<T>>

interface Dispatcher {
  useState: typeof React.useState
  useEffect: typeof React.useEffect
  useLayoutEffect: typeof React.useEffect
}

export const createIsolatedDispatcher = (
  isolatedHookState: IsolatedHookState
): Dispatcher => {
  const useState = <T>(
    initialState: T | (() => T)
  ): [state: T, setter: SetState<T>] => {
    const factory: () => T = ((typeof initialState === 'function'
      ? initialState
      : () => initialState) as unknown) as () => T
    const [state, updateState] = isolatedHookState.nextHookState(factory)

    return [state.value, updateState]
  }
  type Deps = any[] | undefined
  type EffectState = { deps: Deps; cleanup?: Function }

  const dirtyDeps = (a: Deps, b: Deps) => {
    if (a === undefined || b === undefined) return true
    if (a === [] && b === []) return false
    return a.some((value, i) => !Object.is(value, b[i]))
  }

  const useEffectHandler = (effectSet: any) => (
    effect: () => (() => void) | undefined,
    deps: Deps
  ) => {
    effectSet.nextEffect(effect, deps)
  }

  const useEffect = useEffectHandler(isolatedHookState.effects)
  const useLayoutEffect = useEffectHandler(isolatedHookState.layoutEffects)

  return {
    useState: useState as any,
    useEffect: useEffect as any,
    useLayoutEffect: useLayoutEffect as any,
  }
}
