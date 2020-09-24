import React from 'react'

import { createIsolatedDispatcher } from './dispatcher'

const {
  ReactCurrentDispatcher,
} = (React as any).__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED

type IsolatedHook<T> = {
  currentValue: () => T
}

export const testInIsolation = <T>(
  hookInvocation: () => T
): IsolatedHook<T> => {
  const dispatcher = createIsolatedDispatcher()

  let lastResult: T

  const invokeHook = () => {
    const previousDispatcher = ReactCurrentDispatcher.current
    ReactCurrentDispatcher.current = dispatcher
    do {
      dispatcher.startPass()

      lastResult = hookInvocation()

      dispatcher.endPass()
    } while (dispatcher.dirty())
    ReactCurrentDispatcher.current = previousDispatcher
  }

  dispatcher.onUpdated(invokeHook)

  invokeHook()

  return {
    currentValue: () => {
      if (dispatcher.dirty()) invokeHook()
      return lastResult
    },
  }
}
