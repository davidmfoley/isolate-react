import { createEffectSet } from './effectSet'
import { IsolatedHookOptions } from './types/IsolatedHookOptions'
import { createUpdatableHookStates } from './updatableHookStates'
export type IsolatedHookState = ReturnType<typeof createIsolatedHookState>

export const createIsolatedHookState = (options: IsolatedHookOptions) => {
  let first = true

  let usedContextTypes = new Set<React.Context<any>>()

  const context = new Map<React.Context<any>, any>()

  const layoutEffects = createEffectSet()
  const effects = createEffectSet()
  const insertionEffects = createEffectSet()
  const updatableStates = createUpdatableHookStates()

  if (options.context) {
    options.context.forEach((c) => {
      context.set(c.type, c.value)
    })
  }

  let onUpdated = () => {}

  const startPass = () => {
    updatableStates.startPass()
  }

  const endPass = () => {
    first = false

    insertionEffects.flush()
    layoutEffects.flush()
    effects.flush()
    updatableStates.endPass()
  }

  const contextValue = (type: React.Context<any>) =>
    context.has(type) ? context.get(type) : (type as any)._currentValue

  const setContext = (contextType: React.Context<any>, value: any) => {
    if (contextValue(contextType) === value) return
    context.set(contextType, value)
    if (usedContextTypes.has(contextType)) {
      onUpdated()
    }
  }

  return {
    layoutEffects,
    effects,
    insertionEffects,
    startPass,
    endPass,
    nextHookState: updatableStates.nextHookState,
    setContext,
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
    contextValue: (contextType: React.Context<any>) => {
      usedContextTypes.add(contextType)
      return contextValue(contextType)
    },
  }
}

export default createIsolatedHookState
