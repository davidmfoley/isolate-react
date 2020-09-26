import { describe, it } from 'mocha'
import { expect } from 'chai'

import { testInIsolation } from '../src'
import { useRef } from 'react'

describe('useRef', () => {
  const useRefExample = (refValue: string) => {
    const exampleRef = useRef(refValue)
    return exampleRef.current
  }

  it('starts out as the inital value', () => {
    expect(
      testInIsolation(() => useRefExample('trillian')).currentValue()
    ).to.eq('trillian')
  })

  it('can be set', () => {
    const isolated = testInIsolation(() => useRefExample('arthur'))
    isolated.setRef(0, 'ford')
    isolated.invoke()

    expect(isolated.currentValue()).to.eq('ford')
  })
})
