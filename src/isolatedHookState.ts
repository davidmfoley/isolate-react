import { createEffectSet } from './effectSet'
export type IsolatedHookState = ReturnType<typeof createIsolatedHookState>

type HookState<T> = [{ value: T }, (value: (previous: T) => T) => void]

/**
 * A context value used for testing useContext
 */
interface IsolatedHookContext {
  /**
   * The type of context. The return value of `React.CreateContext`.
   */
  type: React.Context<any>
  /**
   * Value for the context.
   */
  value: any
}

/**
 * Options when isolating hook, passed as 2nd argument
 */
export type IsolatedHookOptions = {
  /**
   * An array of context values, useful when testing useContext
   */
  context?: IsolatedHookContext[]
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
  const context = new Map<React.Context<any>, any>()

  const layoutEffects = createEffectSet()
  const effects = createEffectSet()

  if (options.context) {
    options.context.forEach((c) => {
      context.set(c.type, c.value)
    })
  }

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

  const setContext = (contextType: React.Context<any>, value: any) => {
    context.set(contextType, value)
    onUpdated()
  }

  return {
    layoutEffects,
    effects,
    endPass,
    nextHookState,
    setContext,
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
    contextValue: (type: React.Context<any>): any =>
      context.has(type) ? context.get(type) : (type as any)._currentValue,
  }
}

export default createIsolatedHookState
