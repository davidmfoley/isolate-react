import { describe, test } from 'mocha'

import React, { useEffect } from 'react'
import { isolateComponentTree } from '../../src/isolateComponent'
import assert from 'node:assert'

describe('inline effect cleanup', () => {
  test('effect cleanup is run for unmounted inlined component', () => {
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

    const Wrapper = ({ keys }: { keys: string[] }) => (
      <div>
        {keys.map((k) => (
          <EffectTracker key={k} tag={k} />
        ))}
      </div>
    )

    const isolated = isolateComponentTree(<Wrapper keys={['a']} />)
    isolated.setProps({ keys: [] })
    assert.deepEqual(calls, ['mount a', 'unmount a'])
  })
})
