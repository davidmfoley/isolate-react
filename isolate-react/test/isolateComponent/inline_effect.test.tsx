import { describe, test, before, after } from 'mocha'

import React, { useEffect } from 'react'
import { isolateComponentTree } from '../../src/isolateComponent'
import assert from 'node:assert'

describe('inline effects', () => {
  let calls = [] as string[]

  const EffectTracker = ({ tag }: { tag: string }) => {
    useEffect(() => {
      calls.push(`mount ${tag}`)
      return () => {
        calls.push(`unmount ${tag}`)
      }
    }, [])
    return <div>{tag}</div>
  }

  const KeyedWrapper = ({ tags }: { tags: string[] }) => (
    <div>
      {tags.map((k) => (
        <EffectTracker key={k} tag={k} />
      ))}
    </div>
  )

  const UnkeyedWrapper = ({ tags }: { tags: string[] }) => (
    <div>
      {tags.map((k) => (
        <EffectTracker tag={k} />
      ))}
    </div>
  )

  beforeEach(() => {
    calls = []
  })

  test('effect cleanup is run for unmounted inlined component', () => {
    const isolated = isolateComponentTree(<KeyedWrapper tags={['a']} />)
    isolated.setProps({ tags: [] })
    assert.deepEqual(calls, ['mount a', 'unmount a'])
  })

  test('no cleanup is run if not unmounted', () => {
    const isolated = isolateComponentTree(<KeyedWrapper tags={['a']} />)
    isolated.setProps({ tags: ['a', 'b'] })
    assert.deepEqual(calls, ['mount a', 'mount b'])
  })

  test('cleanup is run on subsequent unmount', () => {
    const isolated = isolateComponentTree(<KeyedWrapper tags={['a']} />)
    isolated.setProps({ tags: ['a', 'b'] })
    isolated.setProps({ tags: ['b'] })
    assert.deepEqual(calls, ['mount a', 'mount b', 'unmount a'])
  })

  describe('without key prop', () => {
    const realError = console.error
    before(() => {
      console.error = () => {}
    })
    after(() => {
      console.error = realError
    })
    test('effect cleanup is run for unmounted inlined component', () => {
      const isolated = isolateComponentTree(<UnkeyedWrapper tags={['a']} />)
      isolated.setProps({ tags: [] })
      assert.deepEqual(calls, ['mount a', 'unmount a'])
    })

    test('no cleanup is run if not unmounted', () => {
      const isolated = isolateComponentTree(<UnkeyedWrapper tags={['a']} />)
      isolated.setProps({ tags: ['a', 'b'] })
      console.log(isolated.content())
      assert.deepEqual(calls, ['mount a', 'mount b'])
      assert.equal(isolated.content(), '<div>a</div><div>b</div>')
    })

    test('cleanup is run on subsequent unmount', () => {
      const isolated = isolateComponentTree(<UnkeyedWrapper tags={['a']} />)
      isolated.setProps({ tags: ['a', 'b'] })
      isolated.setProps({ tags: ['a'] })
      assert.deepEqual(calls, ['mount a', 'mount b', 'unmount b'])
      console.error = realError
    })
  })
})
