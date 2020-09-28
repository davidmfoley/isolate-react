import { describe, it, beforeEach, afterEach } from 'mocha'
import { expect } from 'chai'

import { isolateHooks } from '../src'
import { useState } from 'react'

describe('useState', () => {
  it('has initial value', () => {
    const useStateExample = () => {
      const [value, setter] = useState('initial')
      return value
    }

    const rendered = isolateHooks(useStateExample)

    const value = rendered.currentValue()
    expect(value).to.equal('initial')
  })

  it('is updated when setState is called', () => {
    let setValue: Function

    const useStateExample = () => {
      const [value, setter] = useState('initial')
      setValue = setter
      return value
    }

    const rendered = isolateHooks(useStateExample)
    setValue('updated')

    const value = rendered.currentValue()
    expect(value).to.equal('updated')
  })

  describe('with two independent setStates', () => {
    let setLetter: Function
    let setNumber: Function

    const useStateExample = () => {
      const [letter, letterSetter] = useState('A')
      const [number, numberSetter] = useState(42)

      setLetter = letterSetter
      setNumber = numberSetter

      return letter + number
    }

    it('has initial values', () => {
      const rendered = isolateHooks(useStateExample)

      const value = rendered.currentValue()
      expect(value).to.equal('A42')
    })

    it('can set values', () => {
      const rendered = isolateHooks(useStateExample)
      setLetter('B')
      setNumber(3)

      const value = rendered.currentValue()
      expect(value).to.equal('B3')
    })

    it('can set multiple values', () => {
      const rendered = isolateHooks(useStateExample)
      setLetter('A')
      setLetter('B')
      setLetter('C')
      setNumber(7)
      setNumber(8)

      const value = rendered.currentValue()
      expect(value).to.equal('C8')
    })
  })
})
