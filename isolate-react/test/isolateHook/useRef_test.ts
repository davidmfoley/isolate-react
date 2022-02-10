import { describe, it } from 'mocha'
import { expect } from 'chai'

import { isolateHook } from '../../src/isolateHook'
import { useEffect, useRef } from 'react'

describe('useRef', () => {
  const useRefExample = (refValue: string) => {
    const exampleRef = useRef(refValue)
    return exampleRef.current
  }

  it('starts out as the inital value', () => {
    expect(isolateHook(() => useRefExample('trillian'))()).to.eq('trillian')
  })

  it('can be set', () => {
    const isolated = isolateHook(() => useRefExample('arthur'))
    isolated()
    isolated.setRef(0, 'ford')
    isolated.invoke()

    expect(isolated.currentValue()).to.eq('ford')
  })

  it('maintains same reference each invocation', () => {
    const useMounted = () => {
      const mounted = useRef(true)
      useEffect(
        () => () => {
          mounted.current = false
        },
        []
      )

      return mounted
    }

    const isolated = isolateHook(useMounted)
    expect(isolated()).to.eq(isolated())
  })
})
