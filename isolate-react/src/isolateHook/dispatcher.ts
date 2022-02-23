import React, { Dispatch } from 'react'
import dirtyDependencies from './dirtyDependencies'
import { IsolatedHookState } from './isolatedHookState'

type SetState<T> = React.Dispatch<React.SetStateAction<T>>

interface Dispatcher {
  useCallback: typeof React.useCallback
  useContext: typeof React.useContext
  useDebugValue: typeof React.useDebugValue
  useEffect: typeof React.useEffect
  useImperativeHandle: typeof React.useImperativeHandle
  useLayoutEffect: typeof React.useEffect
  useMemo: typeof React.useMemo
  useState: typeof React.useState
  useReducer: typeof React.useReducer
  useRef: typeof React.useRef
}

export const createIsolatedDispatcher = (
  isolatedHookState: IsolatedHookState
): Dispatcher => {
  const useState = <T>(
    initialState: T | (() => T)
  ): [state: T, setter: SetState<T>] => {
    const factory: () => T = (typeof initialState === 'function'
      ? initialState
      : () => initialState) as unknown as () => T

    const [state, updateState] = isolatedHookState.nextHookState<T>({
      type: 'useState',
      create: factory,
      update: (current: T, next: T | React.SetStateAction<T>) => {
        if (next instanceof Function) {
          return { value: next(current) }
        }
        return { value: next }
      },
    })

    return [
      state.value,
      updateState,
      /*
       */
    ]
  }

  const useReducer = <S, A>(
    reducer: (state: S, action: A) => S,
    initialState: S | (() => S)
  ): [state: S, dispatch: Dispatch<A>] => {
    const factory: () => S = (typeof initialState === 'function'
      ? initialState
      : () => initialState) as unknown as () => S

    const [state, updateState] = isolatedHookState.nextHookState({
      type: 'useReducer',
      create: factory,
      update: (current: S, action: A) => ({
        value: reducer(current, action),
      }),
    })

    return [state.value, updateState as any]
  }
  type Deps = any[] | undefined

  const useEffectHandler =
    (effectSet: any) =>
    (effect: () => (() => void) | undefined, deps: Deps) => {
      effectSet.nextEffect(effect, deps)
    }

  const useEffect = useEffectHandler(isolatedHookState.effects)
  const useLayoutEffect = useEffectHandler(isolatedHookState.layoutEffects)

  const memoize = (
    type: 'useMemo' | 'useCallback',
    fn: Function,
    deps: any
  ) => {
    const [state] = isolatedHookState.nextHookState({
      type,
      create: () => ({
        value: fn(),
        deps,
      }),
    })
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
    useImperativeHandle: () => {},
    useState: useState as any,
    useReducer: useReducer as any,
    useEffect: useEffect as any,
    useLayoutEffect: useLayoutEffect as any,
    useContext: (type) => isolatedHookState.contextValue(type),
    useRef: (initialValue?: any) => {
      const [ref] = isolatedHookState.nextHookState({
        type: 'useRef',
        create: () => ({
          current: initialValue,
        }),
      })
      return ref.value
    },
  }
}
