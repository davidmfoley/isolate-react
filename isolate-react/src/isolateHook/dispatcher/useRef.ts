import { IsolatedHookState } from '../isolatedHookState'

export const createUseRef =
  (isolatedHookState: IsolatedHookState) => (initialValue?: any) => {
    const [ref] = isolatedHookState.nextHookState({
      type: 'useRef',
      create: () => ({
        current: initialValue,
      }),
    })
    return ref.value
  }
