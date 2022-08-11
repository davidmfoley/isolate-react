import React from 'react'
import { IsolatedHookState } from '../isolatedHookState'
import { createUseState } from './useState'
import { createMemoizer } from './memoize'
import { createUseReducer } from './useReducer'
import { createUseSyncExternalStore } from './useSyncExternalStore'

let nextUseIdValue = 0

interface Dispatcher {
  useCallback: typeof React.useCallback
  useContext: typeof React.useContext
  useDebugValue: typeof React.useDebugValue
  useEffect: typeof React.useEffect
  useImperativeHandle: typeof React.useImperativeHandle
  useLayoutEffect: typeof React.useEffect
  useInsertionEffect: typeof React.useInsertionEffect
  useMemo: typeof React.useMemo
  useState: typeof React.useState
  useReducer: typeof React.useReducer
  useRef: typeof React.useRef
  useId: typeof React.useId
  useTransition: typeof React.useTransition
  useDeferredValue: typeof React.useDeferredValue
  useSyncExternalStore: typeof React.useSyncExternalStore
}

export const createIsolatedDispatcher = (
  isolatedHookState: IsolatedHookState
): Dispatcher => {
  const useState = createUseState(isolatedHookState)
  const useReducer = createUseReducer(isolatedHookState)

  type Deps = any[] | undefined

  const useEffectHandler =
    (effectSet: any) =>
    (effect: () => (() => void) | undefined, deps: Deps) => {
      effectSet.nextEffect(effect, deps)
    }

  const useEffect = useEffectHandler(isolatedHookState.effects)
  const useLayoutEffect = useEffectHandler(isolatedHookState.layoutEffects)
  const useInsertionEffect = useEffectHandler(
    isolatedHookState.insertionEffects
  )

  const memoize = createMemoizer(isolatedHookState)
  const generateId = () => {
    nextUseIdValue++
    return `useId-${nextUseIdValue}`
  }

  const useSyncExternalStore = createUseSyncExternalStore(isolatedHookState)

  return {
    useMemo: ((fn: any, deps: any) => {
      return memoize('useMemo', fn, deps)
    }) as any,
    useCallback: ((fn: any, deps: any) => {
      return memoize('useCallback', () => fn, deps)
    }) as any,
    useDebugValue: () => {},
    useDeferredValue: (value) => value,
    useImperativeHandle: () => {},
    useState: useState as any,
    useReducer: useReducer as any,
    useEffect: useEffect as any,
    useLayoutEffect: useLayoutEffect as any,
    useInsertionEffect: useInsertionEffect as any,
    useContext: (type) => isolatedHookState.contextValue(type),
    useId: () => useState(generateId)[0],
    useSyncExternalStore,
    useTransition: () => [
      false,
      (fn) => {
        fn()
      },
    ],
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
