import { describe, it, beforeEach, afterEach } from 'mocha'
import { expect } from 'chai'

import isolateHook from '../../src/isolateHook'
import { useState } from 'react'

describe('useState', () => {
  it('has initial value', () => {
    const useStateExample = () => {
      const [value, setter] = useState('initial')
      return value
    }

    const isolated = isolateHook(useStateExample)

    const value = isolated()
    expect(value).to.equal('initial')
  })

  it('is updated when setState is called', () => {
    let setValue: Function

    const useStateExample = () => {
      const [value, setter] = useState('initial')
      setValue = setter
      return value
    }

    const isolated = isolateHook(useStateExample)
    isolated()
    setValue('updated')

    const value = isolated()
    expect(value).to.equal('updated')
  })

  it('works with a function for initial value', () => {
    const useStateExample = () => {
      const [value] = useState(() => 'initial')
      return value
    }

    const isolated = isolateHook(useStateExample)
    const value = isolated()

    expect(value).to.equal('initial')
  })

  it('works with a function passed to setter', () => {
    const useStateExample = () => {
      return useState(() => 'initial')
    }

    const isolated = isolateHook(useStateExample)
    const [value, setValue] = isolated()
    setValue(() => 'updated')

    expect(isolated()[0]).to.equal('updated')
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
      const isolated = isolateHook(useStateExample)

      const value = isolated()
      expect(value).to.equal('A42')
    })

    it('can set values', () => {
      const isolated = isolateHook(useStateExample)
      isolated()
      setLetter('B')
      setNumber(3)

      const value = isolated()
      expect(value).to.equal('B3')
    })

    it('can set multiple values', () => {
      const isolated = isolateHook(useStateExample)
      isolated()
      setLetter('A')
      setLetter('B')
      setLetter('C')
      setNumber(7)
      setNumber(8)

      const value = isolated()
      expect(value).to.equal('C8')
    })
  })
})
