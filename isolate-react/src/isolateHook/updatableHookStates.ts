export type StateType =
  | 'useRef'
  | 'useState'
  | 'useMemo'
  | 'useCallback'
  | 'useReducer'
  | 'useSyncExternalStore'

export type HookState<T> = [
  { value: T; type: StateType; cleanup?: (value: T) => void },
  (update: (previous: T) => T) => void
]

export interface HookStateDef<T> {
  type: StateType
  create: () => T

  update?: (
    current: T,
    next: any
  ) => {
    value: T
  }

  cleanup?: (value: T) => void

  onCreated?: (
    update: (getNextValue: (previous: T) => T) => void,
    value: T
  ) => void
}

/**
 * Updatable hook states hold a value that can be updated.
 * When it is updated, they can effect a re-invocation of the containing hook.
 *
 * This is the backing storage for:
 * - useState
 * - useRef
 * - useSyncExternalStore
 * - useReducer
 * - useMemo
 * - useCalback
 *
 * Within a hook invocation, they must have the same order.
 */
export const createUpdatableHookStates = () => {
  let inProgress = false
  let dirty = false
  let first = true

  let hookStates: HookState<any>[] = []
  let nextHookStates: HookState<any>[] = []
  let pendingStateUpdates = [] as (() => void)[]

  let onUpdated = () => {}

  const executeOutsideRenderPass = (fn: () => void) => {
    if (inProgress) {
      pendingStateUpdates.push(fn)
    } else {
      fn()
    }
  }

  const addHookState = <T>(
    type: StateType,
    value: T,
    updateValue?: any,
    onCreated?: any,
    cleanup?: (value: T) => void
  ): HookState<T> => {
    let newState = { value, type, cleanup, pendingValue: value }

    const updater = updateValue
      ? (next: any) => {
          newState.pendingValue = updateValue(newState.pendingValue, next).value

          executeOutsideRenderPass(() => {
            newState.value = newState.pendingValue

            dirty = true
            onUpdated()
          })
        }
      : () => {
          throw new Error(`Could not update ${type}`)
        }

    const state = [newState, updater] as HookState<T>

    if (onCreated) onCreated(updater, newState.value)

    nextHookStates.push(state)

    return state
  }

  const nextHookState = <T>({
    type,
    create,
    update,
    onCreated,
    cleanup,
  }: HookStateDef<T>): HookState<T> => {
    if (first) return addHookState(type, create(), update, onCreated, cleanup)
    let state = hookStates.shift()
    nextHookStates.push(state)
    return state
  }

  const startPass = () => {
    inProgress = true
  }

  const flushStateUpdates = () => {
    for (let update of pendingStateUpdates) {
      update()
    }
    pendingStateUpdates = []
  }

  const endPass = () => {
    inProgress = false
    dirty = false
    first = false

    flushStateUpdates()

    hookStates = nextHookStates
  }

  const setRef = (index: number, value: any) => {
    const refs = hookStates.filter(([s]) => s.type === 'useRef')
    refs[index][0].value.current = value
  }

  return {
    startPass,
    endPass,
    nextHookState,
    setRef,
    dirty: () => dirty,
    onUpdated: (handler: () => void) => {
      onUpdated = handler
    },
    cleanup: () => {
      for (let [hookState] of hookStates) {
        if (hookState.cleanup) hookState.cleanup(hookState.value)
      }
    },
  }
}
