import { describe, test } from 'mocha'
import assert from 'node:assert'

import React from 'react'
import { isolateComponentTree } from '../../src/isolateComponent'

type ErrorBoundaryProps = { children: any; onError?: (e: any) => void }

class BaseErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  { errorMessage: string }
> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { errorMessage: '' }
  }
  render() {
    return this.state.errorMessage ? (
      <h1>Error: {this.state.errorMessage}</h1>
    ) : (
      this.props.children
    )
  }
}

const ThrowAnError = () => {
  throw new Error('test')
}

const ThrowIfOdd = ({ value }: { value: number }) => {
  if (value % 2) throw new Error('Odd!')
  return <div>{value}</div>
}

const standardErrorBoundaryTests = (ErrorBoundary: any) => {
  test('render with no error', () => {
    const isolated = isolateComponentTree(
      <ErrorBoundary>
        <span>Hello</span>
      </ErrorBoundary>
    )
    assert.strictEqual(isolated.toString(), '<span>Hello</span>')
  })

  test('render with an error', () => {
    const isolated = isolateComponentTree(
      <ErrorBoundary>
        <ThrowAnError />
      </ErrorBoundary>
    )
    assert.strictEqual(isolated.toString(), '<h1>Error: test</h1>')
  })

  test('nested error', () => {
    const Wrapper = ({ children }: any) => <div>{children}</div>

    const isolated = isolateComponentTree(
      <Wrapper>
        <ErrorBoundary>
          <ThrowAnError />
        </ErrorBoundary>
      </Wrapper>
    )
    assert.strictEqual(isolated.toString(), '<div><h1>Error: test</h1></div>')
  })

  test('error upon props update', () => {
    const NestedThrowIfOdd = ({ value }: { value: number }) => (
      <ErrorBoundary>
        <ThrowIfOdd value={value} />
      </ErrorBoundary>
    )

    const isolated = isolateComponentTree(<NestedThrowIfOdd value={2} />)
    isolated.mergeProps({ value: 3 })
    assert.strictEqual(isolated.toString(), '<h1>Error: Odd!</h1>')
  })
}

describe('error boundaries', () => {
  describe('getDerivedStateFromError', () => {
    class DerivedStateErrorBoundary extends BaseErrorBoundary {
      static getDerivedStateFromError(error: any) {
        return { errorMessage: error.message }
      }
    }

    standardErrorBoundaryTests(DerivedStateErrorBoundary)
  })

  describe('componentDidCatch', () => {
    class DidCatchErrorBoundary extends BaseErrorBoundary {
      invocations = [] as string[]
      componentDidCatch(error: any) {
        this.setState({ errorMessage: error.message })
      }
    }

    standardErrorBoundaryTests(DidCatchErrorBoundary)
  })

  describe('componentDidCatch and getDerivedStateFromError', () => {
    let invocations = [] as string[]

    class BothErrorBoundary extends BaseErrorBoundary {
      componentDidCatch(error: any) {
        invocations.push('componentDidCatch')
        this.setState({ errorMessage: error.message })
      }

      static getDerivedStateFromError(error: any) {
        invocations.push('getDerivedStateFromError')
        return { errorMessage: error.message }
      }
    }

    standardErrorBoundaryTests(BothErrorBoundary)

    beforeEach(() => {
      invocations = []
    })

    test('invokes in expected order', () => {
      isolateComponentTree(
        <BothErrorBoundary>
          <ThrowAnError />
        </BothErrorBoundary>
      )
      assert.strictEqual(invocations.length, 2)
      assert.strictEqual(invocations[0], 'getDerivedStateFromError')
      assert.strictEqual(invocations[1], 'componentDidCatch')
    })
  })
})
