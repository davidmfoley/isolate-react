import React from 'react'

import { createIsolatedDispatcher } from './dispatcher'
import {
  createIsolatedHookState,
  IsolatedHookOptions,
} from './isolatedHookState'

const {
  ReactCurrentDispatcher,
} = (React as any).__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED

type Parameters<T> = T extends (...args: infer T) => any ? T : never
type WrappedFunction<F extends (...args: any) => any> = (
  ...args: Parameters<F>
) => ReturnType<F>

/**
 *  A hook running in isolation.
 */
export type IsolatedHook<F extends (...args: any) => any> = F & {
  /**
   * Unmount the hook and run all associated cleanup code from effects.
   */
  cleanup: () => void
  /**
   * Get the value returned by the most recent hook invocation
   */
  currentValue: () => ReturnType<F>
  /**
   * Force hook to run
   */
  invoke: WrappedFunction<F>
  /**
   * Set the current value of a ref
   * @param index The zero-based index of the ref (zero for the first useRef, one for the second, etc.)
   * @param value Value to set.
   */
  setRef: (index: number, value?: any) => void
  setContext: <T>(contextType: React.Context<T>, value: T) => void
}

const checkHookFunction = (fn: any) => {
  if (fn === null) {
    throw new Error('isolateHooks: Expected a hook function but got null')
  }
  if (fn === undefined) {
    throw new Error('isolateHooks: Expected a hook function but got undefined')
  }

  if (typeof fn !== 'function') {
    throw new Error(
      `isolateHooks: Expected a hook function but got ${typeof fn} (${fn})`
    )
  }
}

/**
 * Run a react hook in isolation
 * @param hookInvocation The hook to isolate.
 * @param options Optional options, for specifying context values.
 */
const isolateHooks = <F extends (...args: any[]) => any>(
  hookInvocation: F,
  options: IsolatedHookOptions = {}
): IsolatedHook<F> => {
  checkHookFunction(hookInvocation)
  const hookState = createIsolatedHookState(options)
  const dispatcher = createIsolatedDispatcher(hookState)
  let lastArgs: Parameters<F>

  let lastResult: ReturnType<F>

  const invoke = () => invokeHook(...(lastArgs || ([] as any)))

  const invokeHook = (...args: Parameters<F>): ReturnType<F> => {
    hookState.onUpdated(() => {})
    const previousDispatcher = ReactCurrentDispatcher.current
    ReactCurrentDispatcher.current = dispatcher
    do {
      lastResult = hookInvocation(...args)

      hookState.endPass()
    } while (hookState.dirty())
    ReactCurrentDispatcher.current = previousDispatcher
    lastArgs = args

    hookState.onUpdated(invoke)
    return lastResult
  }

  const currentValue = () => lastResult

  return Object.assign((invokeHook as any) as F, {
    currentValue,
    cleanup: () => {
      hookState.cleanup()
    },
    invoke,
    setRef: hookState.setRef,
    setContext: hookState.setContext,
  })
}

export default isolateHooks
