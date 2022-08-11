import { IsolatedHookContext } from './types/IsolatedHookOptions'

export const createHookContexts = (
  initialContexts: IsolatedHookContext[],
  onUpdated: () => void
) => {
  let usedContextTypes = new Set<React.Context<any>>()

  const context = new Map<React.Context<any>, any>()

  if (initialContexts) {
    initialContexts.forEach((c) => {
      context.set(c.type, c.value)
    })
  }

  const contextValue = (type: React.Context<any>) =>
    context.has(type) ? context.get(type) : (type as any)._currentValue

  const setContext = (contextType: React.Context<any>, value: any) => {
    if (contextValue(contextType) === value) return
    context.set(contextType, value)
    if (usedContextTypes.has(contextType)) {
      onUpdated()
    }
  }

  return {
    setContext,
    contextValue: (contextType: React.Context<any>) => {
      usedContextTypes.add(contextType)
      return contextValue(contextType)
    },
  }
}
