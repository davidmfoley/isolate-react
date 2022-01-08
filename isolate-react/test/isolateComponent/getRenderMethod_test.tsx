import React from 'react'
import { describe, test } from 'mocha'
import { expect } from 'chai'
import { categorizeComponent } from '../../src/isolateComponent/isolatedRenderer/renderMethod'

const Fn = () => <div />
class ExampleClass extends React.Component {}

describe('categorizing components', () => {
  test('functional component', () => {
    expect(categorizeComponent(Fn)).to.eq('functional')
  })

  const ExampleContext = React.createContext('yah')

  test('context provider', () => {
    expect(categorizeComponent(ExampleContext.Provider)).to.eq(
      'contextProvider'
    )
  })

  test('context consumer', () => {
    expect(categorizeComponent(ExampleContext.Consumer)).to.eq(
      'contextConsumer'
    )
  })

  test('class component', () => {
    expect(categorizeComponent(ExampleClass)).to.eq('classComponent')
  })

  test('memoed', () => {
    expect(categorizeComponent(React.memo(Fn))).to.eq('memo')
  })
})
