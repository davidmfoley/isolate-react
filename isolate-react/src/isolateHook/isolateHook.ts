import React from 'react'

import { createIsolatedDispatcher } from './dispatcher'
import { createIsolatedHookState } from './isolatedHookState'
import { IsolatedHook } from './types/IsolatedHook'
import { IsolatedHookOptions } from './types/IsolatedHookOptions'
import { IsolateHook } from './types/IsolateHook'

const { ReactCurrentDispatcher } = (React as any)
  .__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED

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
 * @category Entry Point
 * @returns IsolatedHook
 * @param hookInvocation The hook to isolate.
 * @param options Optional options, for specifying context values.
 */
export const isolateHook: IsolateHook = <F extends (...args: any[]) => any>(
  hookInvocation: F,
  options: IsolatedHookOptions = {}
): IsolatedHook<F> => {
  checkHookFunction(hookInvocation)
  const hookState = createIsolatedHookState(options)
  const dispatcher = createIsolatedDispatcher(hookState)
  let updateWaiters = [] as ((val: ReturnType<F>) => void)[]

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

    updateWaiters.forEach((waiter) => waiter(lastResult))
    updateWaiters = []

    return lastResult
  }

  const currentValue = () => lastResult

  const waitForUpdate = () => {
    return new Promise<ReturnType<F>>((resolve) => {
      updateWaiters.push(resolve)
    })
  }

  return Object.assign(invokeHook as any as F, {
    currentValue,
    cleanup: () => {
      hookState.cleanup()
    },
    invoke,
    setRef: hookState.setRef,
    setContext: hookState.setContext,
    waitForUpdate,
  })
}

export default isolateHook
