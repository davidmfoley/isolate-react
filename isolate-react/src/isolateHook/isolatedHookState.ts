import { createEffectSet } from './effectSet'
import { createHookContexts } from './hookContexts'
import { createUpdatableHookStates } from './updatableHookStates'

import { IsolatedHookOptions } from './types/IsolatedHookOptions'
export type IsolatedHookState = ReturnType<typeof createIsolatedHookState>

export const createIsolatedHookState = (options: IsolatedHookOptions) => {
  let first = true
  let onUpdated = () => {}

  const layoutEffects = createEffectSet()
  const effects = createEffectSet()
  const insertionEffects = createEffectSet()
  const updatableStates = createUpdatableHookStates()

  const contexts = createHookContexts(options?.context || [], () => onUpdated())

  const endPass = () => {
    first = false

    insertionEffects.flush()
    layoutEffects.flush()
    effects.flush()

    updatableStates.endPass()
  }

  return {
    layoutEffects,
    effects,
    insertionEffects,
    startPass: updatableStates.startPass,
    endPass,
    nextHookState: updatableStates.nextHookState,
    setContext: contexts.setContext,
    contextValue: contexts.contextValue,
    setRef: updatableStates.setRef,
    firstPass: () => first,
    dirty: () => updatableStates.dirty(),
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
