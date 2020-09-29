import { describe, it, beforeEach, afterEach } from 'mocha'
import { expect } from 'chai'

import isolateHooks from '../src'
import { useContext, createContext } from 'react'

describe('useContext', () => {
  const ExampleContext = createContext<string>('yah')

  it('has default value if no context specified', () => {
    const result = isolateHooks(() => {
      return useContext(ExampleContext)
    })

    expect(result.currentValue()).to.eq('yah')
  })

  it('has specified value if one passed', () => {
    const result = isolateHooks(
      () => {
        return useContext(ExampleContext)
      },
      {
        context: [
          {
            type: ExampleContext,
            value: 'nah',
          },
        ],
      }
    )

    expect(result.currentValue()).to.eq('nah')
  })
})
