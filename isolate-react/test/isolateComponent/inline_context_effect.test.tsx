import * as React from 'react'
import { describe, test } from 'mocha'
import assert from 'node:assert'
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { isolateComponentTree } from '../../src'

const StackContext = createContext({
  push: (_x: any) => {},
  pop: () => {},
  stack: ['bogus'] as any[],
})

const useProvideStack = () => {
  const [stack, setStack] = useState([] as any[])

  const push = useCallback(
    (add: any) =>
      setStack((x) => {
        return [...x, add]
      }),
    []
  )

  const pop = useCallback(
    () =>
      setStack((x) => {
        const next = [...x]
        next.pop()
        return next
      }),
    []
  )

  return useMemo(
    () => ({
      stack,
      push,
      pop,
    }),
    [stack, push, pop]
  )
}

const StackProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <StackContext.Provider value={useProvideStack()}>
      {children}
    </StackContext.Provider>
  )
}

const StackItem = ({ value }: { value: any }) => {
  const { push, pop } = useContext(StackContext)

  useEffect(() => {
    push(value)

    return () => {
      pop()
    }
  }, [])

  return null
}
const StackDisplay = () => <>{useContext(StackContext).stack.join(',')}</>

describe('context and effects with inlined', () => {
  test('render', () => {
    const isolated = isolateComponentTree(
      <StackProvider>
        <StackItem value="a" />
        <StackItem value="b" />
        <StackDisplay />
      </StackProvider>
    )
    assert.equal(isolated.content(), 'a,b')
  })

  test('remove existing', () => {
    const isolated = isolateComponentTree(
      <StackProvider>
        <StackItem value="a" />
        <StackItem value="b" />
        <StackDisplay />
      </StackProvider>
    )
    isolated.setProps({ children: <StackDisplay /> })
    assert.equal(isolated.content(), '')
  })
})
