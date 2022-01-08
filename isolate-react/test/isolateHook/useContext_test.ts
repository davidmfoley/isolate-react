import { describe, it } from 'mocha'
import { expect } from 'chai'

import isolateHook from '../../src/isolateHook'
import { useContext, createContext } from 'react'

describe('useContext', () => {
  const ExampleContext = createContext<string>('yah')

  it('has default value if no context specified', () => {
    const result = isolateHook(() => {
      return useContext(ExampleContext)
    })

    expect(result()).to.eq('yah')
  })

  // deprecated way
  it('has specified value if one passed', () => {
    const result = isolateHook(
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
    const isolated = isolateHook(() => {
      return useContext(ExampleContext)
    })

    isolated.setContext(ExampleContext, 'nah')

    expect(isolated()).to.eq('nah')
  })

  it('rerenders on change', () => {
    let i = 0
    const isolated = isolateHook(() => {
      i++
      return `${useContext(ExampleContext)}${i}`
    })

    isolated()

    isolated.setContext(ExampleContext, 'nah')
    expect(i).to.eq(2)

    expect(isolated.currentValue()).to.eq('nah2')
  })

  it('does not rerender with same reference', () => {
    let i = 0
    const isolated = isolateHook(() => {
      i++
      return `${useContext(ExampleContext)}${i}`
    })

    isolated()

    isolated.setContext(ExampleContext, 'nah')
    isolated.setContext(ExampleContext, 'nah')
    expect(i).to.eq(2)

    expect(isolated.currentValue()).to.eq('nah2')
  })

  it('does not rerender on change of unused context', () => {
    let i = 0
    const UnusedContext = createContext<string>('yah')
    const isolated = isolateHook(() => {
      i++
      return `${useContext(ExampleContext)}${i}`
    })

    isolated()

    isolated.setContext(UnusedContext, 'nah')
    isolated.setContext(UnusedContext, 'nah')
    expect(i).to.eq(1)
  })
})
