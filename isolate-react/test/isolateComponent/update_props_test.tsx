import { describe, it } from 'mocha'
import React from 'react'
import { isolateComponent } from '../../src/isolateComponent'
import { expect } from 'chai'

describe('updating props', () => {
  const Name = (props: { first: string; last: string }) => (
    <span>
      {props.first} {props.last}
    </span>
  )

  it('updates and re-renders upon mergeProps', () => {
    const component = isolateComponent(<Name first="eddard" last="stark" />)

    expect(component.findOne('span').content()).to.eq('eddard stark')

    component.mergeProps({ first: 'ned' })
    expect(component.findOne('span').content()).to.eq('ned stark')
  })

  it('updates and re-renders upon setProps', () => {
    const component = isolateComponent(<Name first="eddard" last="stark" />)

    expect(component.findOne('span').content()).to.eq('eddard stark')

    component.setProps({ first: 'catelyn', last: 'tully' })
    expect(component.findOne('span').content()).to.eq('catelyn tully')
  })
})
