import { IsolatedHookState } from '../isolatedHookState'

type SetState<T> = React.Dispatch<React.SetStateAction<T>>

export const createUseState =
  (isolatedHookState: IsolatedHookState) =>
  <T>(initialState: T | (() => T)): [state: T, setter: SetState<T>] => {
    const factory: () => T = (typeof initialState === 'function'
      ? initialState
      : () => initialState) as unknown as () => T

    const [state, updateState] = isolatedHookState.nextHookState<T>({
      type: 'useState',
      create: factory,
      update: (current: T, next: T | React.SetStateAction<T>) => {
        if (next instanceof Function) {
          return { value: next(current) }
        }
        return { value: next }
      },
    })

    return [state.value, updateState]
  }
