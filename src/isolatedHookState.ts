import { createEffectSet } from './effectSet'
export type IsolatedHookState = ReturnType<typeof createIsolatedHookState>

type HookState<T> = [{ value: T }, (value: T) => void]

type IsolatedHookContext = {
  type: React.Context<any>
  value: any
}

export type IsolatedHookOptions = {
  context?: IsolatedHookContext[]
}

type StateType = 'useRef' | 'useState'

export const createIsolatedHookState = (options: IsolatedHookOptions) => {
  let dirty = false
  let first = true

  let hookStates: any[] = []
  let nextHookStates: any[] = []

  const layoutEffects = createEffectSet()
  const effects = createEffectSet()

  let onUpdated = () => {}

  const updater = (target: any) => (nextValue: any) => {
    target.value = nextValue
    if (!dirty) {
      dirty = true
      onUpdated()
    }
  }

  const addHookState = <T>(type: StateType, value: T): HookState<T> => {
    let newState = { value, type }
    nextHookStates.push(newState)
    return [newState, updater(newState)]
  }

  const nextHookState = <T>(
    type: StateType,
    factory: (() => T) | undefined
  ): HookState<T> => {
    if (first) return addHookState(type, factory())
    let state = { ...hookStates.shift() }
    nextHookStates.push(state)
    return [state, updater(state)]
  }

  const endPass = () => {
    dirty = false
    first = false

    layoutEffects.flush()
    effects.flush()

    hookStates = nextHookStates
  }

  const setRef = (index: number, value: any) => {
    const refs = hookStates.filter((s) => s.type === 'useRef')
    refs[index].value = value
  }

  return {
    layoutEffects,
    effects,
    endPass,
    nextHookState,
    setRef,
    firstPass: () => first,
    dirty: () => dirty,
    onUpdated: (handler: () => void) => {
      onUpdated = handler
    },
    cleanup: () => {
      layoutEffects.cleanup()
      effects.cleanup()
    },
    contextValue: (type: React.Context<any>) => {
      const match = (options.context || []).find((c) => c.type === type)
      return match ? match.value : (type as any)._currentValue
    },
  }
}
