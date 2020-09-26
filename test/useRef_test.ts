import { describe, it, beforeEach, afterEach } from 'mocha'
import { expect } from 'chai'

import { testInIsolation } from '../src'
import { useRef, createRef } from 'react'

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
})
