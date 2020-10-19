import { describe, it } from 'mocha'
import React from 'react'
import { isolateComponent } from '../src'
import { expect } from 'chai'

describe('handling null ', () => {
  const MaybeNull = (props: { nullify: boolean }) =>
    props.nullify ? null : <div>not null</div>
  it('handles null', () => {
    const component = isolateComponent(<MaybeNull nullify={true} />)
    expect(component.content()).to.eq(null)
    expect(component.toString()).to.eq('')
  })

  it('can update props on component that returns null', () => {
    const component = isolateComponent(<MaybeNull nullify={true} />)
    component.setProps({
      nullify: false,
    })

    expect(component.findOne('div').content()).to.eq('not null')
    expect(component.findOne('div').toString()).to.eq(`<div>not null</div>`)
  })

  it('handles null fragment return', () => {
    const EmptyFragment = () => <>{false}</>
    const component = isolateComponent(<EmptyFragment />)
    expect(component.content()).to.eq('')
  })
})
