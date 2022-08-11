import React from 'react'
import { IsolatedHookState } from '../isolatedHookState'

export const createUseSyncExternalStore =
  (isolatedHookState: IsolatedHookState): typeof React.useSyncExternalStore =>
  (subscribe, getSnapshot, _getServerSnapshot) => {
    const [state] = isolatedHookState.nextHookState<any>({
      type: 'useSyncExternalStore',
      create: () => ({
        getSnapshot,
        subscribe,
        unsubscribe: () => {},
        value: getSnapshot(),
      }),
      update: (previous, next) => {
        return { value: { ...previous, value: next } }
      },
      onCreated: (update, value) => {
        const updateState = () => {
          update(value.getSnapshot())
        }
        value.unsubscribe = value.subscribe(updateState)
      },
      cleanup: (value) => {
        value.unsubscribe()
      },
    })

    return state.value.value
  }
