import { describe, it } from 'mocha'
import { expect } from 'chai'

import isolateHooks from '../src'
import { useRef } from 'react'

describe('useRef', () => {
  const useRefExample = (refValue: string) => {
    const exampleRef = useRef(refValue)
    return exampleRef.current
  }

  it('starts out as the inital value', () => {
    expect(isolateHooks(() => useRefExample('trillian'))()).to.eq('trillian')
  })

  it('can be set', () => {
    const isolated = isolateHooks(() => useRefExample('arthur'))
    isolated()
    isolated.setRef(0, 'ford')
    isolated.invoke()

    expect(isolated.currentValue()).to.eq('ford')
  })
})
