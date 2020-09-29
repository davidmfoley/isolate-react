import { createEffectSet } from './effectSet'
export type IsolatedHookState = ReturnType<typeof createIsolatedHookState>

type HookState<T> = [{ value: T }, (value: (previous: T) => T) => void]

/**
 * A context value used for testing useContext
 */
type IsolatedHookContext<T> = {
  /**
   * The type of context. The return value of `React.CreateContext`.
   */
  type: React.Context<T>
  /**
   * Value for the context.
   */
  value: T
}

/**
 * Options when isolating hook, passed as 2nd argument
 */
export type IsolatedHookOptions = {
  /**
   * An array of context values, useful when testing useContext
   */
  context?: IsolatedHookContext<unknown>[]
}

type StateType =
  | 'useRef'
  | 'useState'
  | 'useMemo'
  | 'useCallback'
  | 'useReducer'

export const createIsolatedHookState = (options: IsolatedHookOptions) => {
  let dirty = false
  let first = true

  let hookStates: any[] = []
  let nextHookStates: any[] = []

  const layoutEffects = createEffectSet()
  const effects = createEffectSet()

  let onUpdated = () => {}

  const updater = (target: any) => (nextValue: (previous: any) => any) => {
    target.value = nextValue(target.value)
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
    factory: () => T
  ): HookState<T> => {
    if (first) return addHookState(type, factory())
    let state = hookStates.shift()
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

export default isolatedHookState
