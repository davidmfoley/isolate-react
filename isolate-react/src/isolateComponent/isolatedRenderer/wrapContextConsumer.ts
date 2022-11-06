import { useContext } from 'react'

export const wrapContextConsumer = (t: any) => ({
  render: ({ children }: { children: any }) => {
    const value = useContext(t._context)

    if (typeof children === 'function') return children(value)
    return null
  },
  tryToHandleError: () => ({ handled: false } as const),
})
