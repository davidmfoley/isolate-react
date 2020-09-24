import { describe, it, beforeEach, afterEach } from 'mocha'
import { expect } from 'chai'

import { testInIsolation } from '../src'
import React, { useEffect, useState } from 'react'

describe('testInIsolation', () => {
  it('is a function', () => {
    expect(testInIsolation).to.be.a('function')
  })

  describe('useState', () => {
    it('has initial value', () => {
      const useStateExample = () => {
        const [value, setter] = useState('initial')
        return value
      }

      const rendered = testInIsolation(useStateExample)

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

      const rendered = testInIsolation(useStateExample)
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
        const rendered = testInIsolation(useStateExample)

        const value = rendered.currentValue()
        expect(value).to.equal('A42')
      })

      it('can set values', () => {
        const rendered = testInIsolation(useStateExample)
        setLetter('B')
        setNumber(3)

        const value = rendered.currentValue()
        expect(value).to.equal('B3')
      })
    })
  })

  describe('useEffect', () => {
    let invocations: string[]
    beforeEach(() => {
      invocations = []
    })

    it('invokes effect first time', () => {
      const useEffectExample = () => {
        useEffect(() => {
          invocations.push('effect')
        }, [])
        return ''
      }

      testInIsolation(useEffectExample)
      expect(invocations).to.eql(['effect'])
    })

    it('invokes effect after hook completes', () => {
      const useEffectExample = () => {
        useEffect(() => {
          invocations.push('effect')
        }, [])
        invocations.push('render')
      }

      testInIsolation(useEffectExample)
      expect(invocations).to.eql(['render', 'effect'])
    })

    it('invokes effect if deps change', () => {
      let setName: Function

      const useEffectExample = () => {
        const [name, setter] = useState('arthur')
        setName = setter
        useEffect(() => {
          invocations.push(`hello ${name}`)
        }, [name])
        return ''
      }

      testInIsolation(useEffectExample)
      setName('ford')

      expect(invocations).to.eql(['hello arthur', 'hello ford'])
    })

    it('does not invoke effect if deps do not change', () => {
      let setName: Function

      const useEffectExample = () => {
        const [name, setter] = useState('arthur')
        setName = setter
        useEffect(() => {
          invocations.push(`hello ${name}`)
        }, [name])
        return ''
      }

      testInIsolation(useEffectExample)
      setName('arthur')

      expect(invocations).to.eql(['hello arthur'])
    })
  })
})
