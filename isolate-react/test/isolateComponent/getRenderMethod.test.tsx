import React from 'react'
import { describe, test } from 'mocha'
import assert from 'node:assert'
import { categorizeComponent } from '../../src/isolateComponent/isolatedRenderer/renderMethod'

const Fn = () => <div />
class ExampleClass extends React.Component {}

describe('categorizing components', () => {
  test('functional component', () => {
    assert.strictEqual(categorizeComponent(Fn), 'functional')
  })

  const ExampleContext = React.createContext('yah')

  test('context provider', () => {
    assert.strictEqual(
      categorizeComponent(ExampleContext.Provider),
      'contextProvider'
    )
  })

  test('context consumer', () => {
    assert.strictEqual(
      categorizeComponent(ExampleContext.Consumer),
      'contextConsumer'
    )
  })

  test('class component', () => {
    assert.strictEqual(categorizeComponent(ExampleClass), 'classComponent')
  })

  test('memoed', () => {
    assert.strictEqual(categorizeComponent(React.memo(Fn)), 'memo')
  })
})
