import { describe, it, beforeEach } from 'mocha'
import assert from 'node:assert'
import { isolateHook } from '../../src/isolateHook'
import { useEffect, useInsertionEffect, useLayoutEffect, useState } from 'react'

describe('effects', () => {
  let invocations: string[]
  beforeEach(() => {
    invocations = []
  })

  describe('useEffect', () => {
    it('invokes effect first time', () => {
      const useEffectExample = () => {
        useEffect(() => {
          invocations.push('effect')
        }, [])
        return ''
      }

      isolateHook(useEffectExample)()
      assert.deepEqual(invocations, ['effect'])
    })

    it('invokes effect after hook completes', () => {
      const useEffectExample = () => {
        useEffect(() => {
          invocations.push('effect')
        }, [])
        invocations.push('render')
      }

      isolateHook(useEffectExample)()
      assert.deepEqual(invocations, ['render', 'effect'])
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

      isolateHook(useEffectExample)()
      setName('ford')

      assert.deepEqual(invocations, ['hello arthur', 'hello ford'])
    })

    it('can set state in mount effect', () => {
      const useEffectExample = () => {
        const [name, setName] = useState('arthur')
        useEffect(() => {
          setName('trillian')
        }, [])
        return name
      }

      const isolated = isolateHook(useEffectExample)

      assert.strictEqual(isolated(), 'trillian')
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

      isolateHook(useEffectExample)()
      setName('arthur')

      assert.deepEqual(invocations, ['hello arthur'])
    })

    it('cleans up effect upon dep change and unmount', () => {
      let setName: Function

      const useEffectExample = () => {
        const [name, setter] = useState('arthur')
        setName = setter
        useEffect(() => {
          invocations.push(`hello ${name}`)
          return () => {
            invocations.push(`goodbye ${name}`)
          }
        }, [name])
        return ''
      }

      const isolated = isolateHook(useEffectExample)
      isolated()
      setName('ford')
      isolated.cleanup()

      assert.deepEqual(invocations, [
        'hello arthur',
        'goodbye arthur',
        'hello ford',
        'goodbye ford',
      ])
    })
  })

  describe('effect order', () => {
    it('insertion effect -> layout effect -> effect', () => {
      const useEffectOrderExample = () => {
        useEffect(() => {
          invocations.push('useEffect')
          return () => {
            invocations.push('cleanup useEffect')
          }
        }, [])

        useLayoutEffect(() => {
          invocations.push('useLayoutEffect')
          return () => {
            invocations.push('cleanup useLayoutEffect')
          }
        }, [])

        useInsertionEffect(() => {
          invocations.push('useInsertionEffect')
          return () => {
            invocations.push('cleanup useInsertionEffect')
          }
        }, [])
        return ''
      }

      const isolated = isolateHook(useEffectOrderExample)
      isolated()
      isolated.cleanup()
      assert.deepEqual(invocations, [
        'useInsertionEffect',
        'useLayoutEffect',
        'useEffect',
        'cleanup useInsertionEffect',
        'cleanup useLayoutEffect',
        'cleanup useEffect',
      ])
    })
  })
})
