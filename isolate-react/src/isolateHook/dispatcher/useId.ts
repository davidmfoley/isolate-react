import { IsolatedHookState } from '../isolatedHookState'

let nextUseIdValue = 0

const generateId = () => {
  nextUseIdValue++
  return `useId-${nextUseIdValue}`
}

export const createUseId = (isolatedHookState: IsolatedHookState) => () => {
  const [state] = isolatedHookState.nextHookState<string>({
    type: 'useState',
    create: generateId,
  })

  return state.value
}
