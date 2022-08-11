import { createEffectSet } from './effectSet'
import { createHookContexts } from './hookContexts'
import { createUpdatableHookStates } from './updatableHookStates'

import { IsolatedHookOptions } from './types/IsolatedHookOptions'
export type IsolatedHookState = ReturnType<typeof createIsolatedHookState>

export const createIsolatedHookState = (options: IsolatedHookOptions) => {
  let onUpdated = () => {}

  const layoutEffects = createEffectSet()
  const effects = createEffectSet()
  const insertionEffects = createEffectSet()

  const updatableStates = createUpdatableHookStates()

  const contexts = createHookContexts(options?.context || [], () => onUpdated())

  const endPass = () => {
    insertionEffects.flush()
    layoutEffects.flush()
    effects.flush()

    updatableStates.endPass()
  }

  const invokeWhileDirty = (fn: () => void) => {
    do {
      updatableStates.startPass()
      fn()
      endPass()
    } while (updatableStates.dirty())
  }

  return {
    layoutEffects,
    effects,
    insertionEffects,
    invokeWhileDirty,
    nextHookState: updatableStates.nextHookState,
    setContext: contexts.setContext,
    setRef: updatableStates.setRef,
    contextValue: contexts.contextValue,
    onUpdated: (handler: () => void) => {
      onUpdated = handler
      updatableStates.onUpdated(handler)
    },
    cleanup: () => {
      insertionEffects.cleanup()
      layoutEffects.cleanup()
      effects.cleanup()
      updatableStates.cleanup()
    },
  }
}

export default createIsolatedHookState
