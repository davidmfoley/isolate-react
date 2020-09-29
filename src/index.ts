import React from 'react'

import { createIsolatedDispatcher } from './dispatcher'
import {
  createIsolatedHookState,
  IsolatedHookOptions,
} from './isolatedHookState'

const {
  ReactCurrentDispatcher,
} = (React as any).__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED

/**
 *  A hook running in isolation.
 */
type IsolatedHook<T> = {
  /**
   * Unmount the hook and runs all associated cleanup code from effects.
   */
  cleanup: () => void
  /**
   * Get the value returned by the most recent hook invocation
   */
  currentValue: () => T
  /**
   * Force hook to run
   */
  invoke: () => void
  /**
   * Set the current value of a ref
   * @param index The zero-based index of the ref (zero for the first useRef, one for the second, etc.)
   * @param value Value to set.
   */
  setRef: (index: number, value?: any) => void
}

/**
 * Run a react hook in isolation
 * @param hookInvocation The hook invocation -- a function that calls a hook.
 * @param options Optional options, for specifying context values.
 */
const isolateHooks = <T>(
  hookInvocation: () => T,
  options: IsolatedHookOptions = {}
): IsolatedHook<T> => {
  const hookState = createIsolatedHookState(options)
  const dispatcher = createIsolatedDispatcher(hookState)

  let lastResult: T

  const invokeHook = () => {
    const previousDispatcher = ReactCurrentDispatcher.current
    ReactCurrentDispatcher.current = dispatcher
    do {
      lastResult = hookInvocation()

      hookState.endPass()
    } while (hookState.dirty())
    ReactCurrentDispatcher.current = previousDispatcher
  }

  hookState.onUpdated(invokeHook)

  invokeHook()

  return {
    currentValue: () => {
      if (hookState.dirty()) invokeHook()
      return lastResult
    },
    cleanup: () => {
      hookState.cleanup()
    },
    invoke: invokeHook,
    setRef: hookState.setRef,
  }
}

export default isolateHooks
