import { IsolatedHookState } from '../isolatedHookState'
import dirtyDependencies from '../dirtyDependencies'

export const createMemoizer =
  (isolatedHookState: IsolatedHookState) =>
  (type: 'useMemo' | 'useCallback', fn: Function, deps: any) => {
    const [state] = isolatedHookState.nextHookState({
      type,
      create: () => ({
        value: fn(),
        deps,
      }),
    })
    if (dirtyDependencies(deps, state.value.deps)) {
      state.value.value = fn()
      state.value.deps = deps
    }
    return state.value.value
  }
