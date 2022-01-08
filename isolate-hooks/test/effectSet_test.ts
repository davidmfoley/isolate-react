import { describe, it, beforeEach } from 'mocha'
import { expect } from 'chai'
import { createEffectSet } from '../src/effectSet'

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
    expect(count).to.eq(1)
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

    expect(count).to.eq(1)
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

    expect(invocations).to.eql([
      'invoke 1',
      'cleanup 1',
      'invoke 2',
      'cleanup 2',
    ])
  })

  it('does not execute the second time if deps do not change', () => {})
})
