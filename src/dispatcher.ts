import React from 'react'
import dirtyDependencies from './dirtyDepenendencies'
import { IsolatedHookState } from './isolatedHookState'

type SetState<T> = React.Dispatch<React.SetStateAction<T>>

interface Dispatcher {
  useMemo: typeof React.useMemo
  useCallback: typeof React.useCallback
  useState: typeof React.useState
  useEffect: typeof React.useEffect
  useLayoutEffect: typeof React.useEffect
  useContext: typeof React.useContext
  useDebugValue: typeof React.useDebugValue
  useRef: typeof React.useRef
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

    const [state, updateState] = isolatedHookState.nextHookState(
      'useState',
      factory
    )

    return [state.value, updateState]
  }
  type Deps = any[] | undefined

  const useEffectHandler = (effectSet: any) => (
    effect: () => (() => void) | undefined,
    deps: Deps
  ) => {
    effectSet.nextEffect(effect, deps)
  }

  const useEffect = useEffectHandler(isolatedHookState.effects)
  const useLayoutEffect = useEffectHandler(isolatedHookState.layoutEffects)

  const memoize = (
    type: 'useMemo' | 'useCallback',
    fn: Function,
    deps: any
  ) => {
    const [state] = isolatedHookState.nextHookState(type, () => ({
      value: fn(),
      deps,
    }))
    if (dirtyDependencies(deps, state.value.deps)) {
      state.value.value = fn()
      state.value.deps = deps
    }
    return state.value.value
  }
  return {
    useMemo: ((fn: any, deps: any) => {
      return memoize('useMemo', fn, deps)
    }) as any,
    useCallback: ((fn: any, deps: any) => {
      return memoize('useCallback', () => fn, deps)
    }) as any,
    useDebugValue: () => {},
    useState: useState as any,
    useEffect: useEffect as any,
    useLayoutEffect: useLayoutEffect as any,
    useContext: (type) => isolatedHookState.contextValue(type),
    useRef: (initialValue?: any) => {
      const [ref] = isolatedHookState.nextHookState(
        'useRef',
        () => initialValue
      )
      return { current: ref.value }
    },
  }
}
