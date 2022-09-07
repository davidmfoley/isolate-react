import { describe, test } from 'mocha'
import React from 'react'
import { isolateComponent } from '../../src/isolateComponent'
import assert from 'node:assert'
import { disableReactWarnings } from './disableReactWarnings'

describe('null element type', () => {
  disableReactWarnings()
  const Undefined = null as any
  const Bad = () => (
    <div>
      <div />
      <Undefined />
    </div>
  )

  test('throws a useful error', () => {
    assert.throws(
      () => isolateComponent(<Bad />),
      /Invalid element rendered by Bad/
    )
  })

  test('handles inlined', () => {
    const BadWhenInlined = () => (
      <div>
        <Bad />
      </div>
    )
    const component = isolateComponent(<BadWhenInlined />)
    assert.throws(
      () => component.inline('*'),
      /Invalid element rendered by Bad/
    )
  })
})
