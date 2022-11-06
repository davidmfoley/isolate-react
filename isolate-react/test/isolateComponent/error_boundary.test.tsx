import { describe, test } from 'mocha'
import assert from 'node:assert'

import React from 'react'
import { isolateComponentTree } from '../../src/isolateComponent'

type ErrorBoundaryProps = { children: any; onError?: (e: any) => void }

class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  { errorMessage: string }
> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { errorMessage: '' }
  }

  static getDerivedStateFromError(error: any) {
    return { errorMessage: error.message }
  }

  componentDidCatch(_error: any, _errorInfo: React.ErrorInfo) {
    // this.props.onError(error, errorInfo)
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

describe('error boundary', () => {
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
})
