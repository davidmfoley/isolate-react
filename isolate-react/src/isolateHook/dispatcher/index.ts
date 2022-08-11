import React from 'react'
import { IsolatedHookState } from '../isolatedHookState'
import { createUseState } from './useState'
import { createMemoizer } from './memoize'
import { createUseReducer } from './useReducer'
import { createUseSyncExternalStore } from './useSyncExternalStore'
import { createUseRef } from './useRef'
import { createUseId } from './useId'
import { createEffectHandler } from './effects'

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
  const memoize = createMemoizer(isolatedHookState)

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
    useState: createUseState(isolatedHookState) as any,
    useReducer: createUseReducer(isolatedHookState) as any,
    useEffect: createEffectHandler(isolatedHookState.effects),
    useLayoutEffect: createEffectHandler(isolatedHookState.layoutEffects),
    useInsertionEffect: createEffectHandler(isolatedHookState.insertionEffects),
    useContext: (type) => isolatedHookState.contextValue(type),
    useId: createUseId(isolatedHookState),
    useSyncExternalStore: createUseSyncExternalStore(isolatedHookState),
    useTransition: () => [
      false,
      (fn) => {
        fn()
      },
    ],
    useRef: createUseRef(isolatedHookState),
  }
}
