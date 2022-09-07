import { describe, it, beforeEach } from 'mocha'
import { createEffectSet } from '../../src/isolateHook/effectSet'
import assert from 'node:assert'

describe('effectSet', () => {
  let effectSet: ReturnType<typeof createEffectSet>

  beforeEach(() => {
    effectSet = createEffectSet()
  })

  it('executes the first time', () => {
    let count = 0
    effectSet.nextEffect(() => {
      count++
    }, [])
    effectSet.flush()
    assert.strictEqual(count, 1)
  })

  it('does not execute the second time with empty array for deps', () => {
    let count = 0
    const incrementer = () => {
      count++
    }
    effectSet.nextEffect(incrementer, [])
    effectSet.flush()

    effectSet.nextEffect(incrementer, [])
    effectSet.flush()

    assert.strictEqual(count, 1)
  })

  it('executes the second time if deps change', () => {
    let count = 0
    let invocations = []
    const incrementer = () => {
      count++
      invocations.push(`invoke ${count}`)
      return () => invocations.push(`cleanup ${count}`)
    }
    effectSet.nextEffect(incrementer, ['a'])
    effectSet.flush()

    effectSet.nextEffect(incrementer, ['b'])
    effectSet.flush()
    effectSet.cleanup()

    assert.deepEqual(invocations, [
      'invoke 1',
      'cleanup 1',
      'invoke 2',
      'cleanup 2',
    ])
  })

  it('does not execute the second time if deps do not change', () => {})
})
