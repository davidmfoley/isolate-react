import { Dispatch } from 'react'
import { IsolatedHookState } from '../isolatedHookState'

export const createUseReducer =
  (isolatedHookState: IsolatedHookState) =>
  <S, A>(
    reducer: (state: S, action: A) => S,
    initialState: S | (() => S)
  ): [state: S, dispatch: Dispatch<A>] => {
    const factory: () => S = (typeof initialState === 'function'
      ? initialState
      : () => initialState) as unknown as () => S

    const [state, updateState] = isolatedHookState.nextHookState({
      type: 'useReducer',
      create: factory,
      update: (current: S, action: A) => ({
        value: reducer(current, action),
      }),
    })

    return [state.value, updateState as any]
  }
