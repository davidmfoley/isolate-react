import { describe, it } from 'mocha'
import { expect } from 'chai'

import isolateHooks from '../src'
import { useContext, createContext } from 'react'

describe('useContext', () => {
  const ExampleContext = createContext<string>('yah')

  it('has default value if no context specified', () => {
    const result = isolateHooks(() => {
      return useContext(ExampleContext)
    })

    expect(result()).to.eq('yah')
  })

  // deprecated way
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

    expect(result()).to.eq('nah')
  })

  // new way
  it('has specified value if one is set', () => {
    const isolated = isolateHooks(() => {
      return useContext(ExampleContext)
    })

    isolated.setContext(ExampleContext, 'nah')

    expect(isolated()).to.eq('nah')
  })

  it('rerenders on change', () => {
    let i = 0
    const isolated = isolateHooks(() => {
      i++
      return `${useContext(ExampleContext)}${i}`
    })

    isolated()

    isolated.setContext(ExampleContext, 'nah')

    expect(isolated.currentValue()).to.eq('nah2')
  })
})
