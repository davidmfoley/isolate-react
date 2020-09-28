import React from 'react'

import { createIsolatedDispatcher } from './dispatcher'
import {
  createIsolatedHookState,
  IsolatedHookOptions,
} from './isolatedHookState'

const {
  ReactCurrentDispatcher,
} = (React as any).__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED

type IsolatedHook<T> = {
  cleanup: () => void
  currentValue: () => T
  invoke: () => void
  setRef: (index: number, value?: T) => void
}

export const isolateHooks = <T>(
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
