import { describe, test } from 'mocha'
import React from 'react'
import { isolateComponent } from '../../src/isolateComponent'
import { expect } from 'chai'
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

  const BadWhenInlined = () => (
    <div>
      <Bad />
    </div>
  )

  test('throws a useful error', () => {
    try {
      isolateComponent(<Bad />)
    } catch (e: any) {
      expect(e.message).to.match(/Invalid element rendered by Bad/)
    }
  })

  test('handles inlined', () => {
    const component = isolateComponent(<BadWhenInlined />)
    try {
      component.inline('*')
    } catch (e: any) {
      expect(e.message).to.match(/Invalid element rendered by Bad/)
      //expect(e.message).to.match(/BadWhenInlined > div > Bad/) //TODO: recursively unwind paths to bad nodes
    }
  })
})
