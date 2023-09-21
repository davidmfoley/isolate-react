import { describe, it } from 'mocha'
import assert from 'node:assert'
import { isolateHook } from '../../src/isolateHook'
import { useEffect, useState } from 'react'

describe('useState', () => {
  it('has initial value', () => {
    const useStateExample = () => {
      const [value] = useState('initial')
      return value
    }

    const isolated = isolateHook(useStateExample)

    const value = isolated()
    assert.strictEqual(value, 'initial')
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
    assert.strictEqual(value, 'updated')
  })

  it('works with a function for initial value', () => {
    const useStateExample = () => {
      const [value] = useState(() => 'initial')
      return value
    }

    const isolated = isolateHook(useStateExample)
    const value = isolated()

    assert.strictEqual(value, 'initial')
  })

  it('works with a function passed to setter', () => {
    const useStateExample = () => {
      return useState(() => 'initial')
    }

    const isolated = isolateHook(useStateExample)
    const [, setValue] = isolated()
    setValue(() => 'updated')

    assert.strictEqual(isolated()[0], 'updated')
  })

  it('state setter is stable across invocations', () => {
    const useStability = () => {
      const [_, setState] = useState('blah')
      return setState
    }

    const isolated = isolateHook(useStability)
    assert.strictEqual(isolated(), isolated())
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
      assert.strictEqual(value, 'A42')
    })

    it('can set values', () => {
      const isolated = isolateHook(useStateExample)
      isolated()
      setLetter('B')
      setNumber(3)

      const value = isolated()
      assert.strictEqual(value, 'B3')
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
      assert.strictEqual(value, 'C8')
    })
  })

  it('can set same state with fns in two effects', () => {
    const useDoubleTap = () => {
      const [value, setValue] = useState(0)
      const addOne = (x: number) => x + 1

      useEffect(() => {
        setValue(addOne)
      }, [])

      useEffect(() => {
        setValue(addOne)
      }, [])

      return value
    }

    const isolated = isolateHook(useDoubleTap)
    assert.strictEqual(isolated(), 2)
  })
})
