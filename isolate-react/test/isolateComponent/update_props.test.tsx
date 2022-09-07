import { describe, it } from 'mocha'
import React from 'react'
import { isolateComponent } from '../../src/isolateComponent'
import assert from 'node:assert'

describe('updating props', () => {
  const Name = (props: { first: string; last: string }) => (
    <span>
      {props.first} {props.last}
    </span>
  )

  it('updates and re-renders upon mergeProps', () => {
    const component = isolateComponent(<Name first="eddard" last="stark" />)

    assert.strictEqual(component.findOne('span').content(), 'eddard stark')

    component.mergeProps({ first: 'ned' })
    assert.strictEqual(component.findOne('span').content(), 'ned stark')
  })

  it('updates and re-renders upon setProps', () => {
    const component = isolateComponent(<Name first="eddard" last="stark" />)

    assert.strictEqual(component.findOne('span').content(), 'eddard stark')

    component.setProps({ first: 'catelyn', last: 'tully' })
    assert.strictEqual(component.findOne('span').content(), 'catelyn tully')
  })
})
