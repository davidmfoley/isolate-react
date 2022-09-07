import { describe, it } from 'mocha'
import React from 'react'
import { isolateComponent } from '../../src/isolateComponent'
import assert from 'node:assert'

describe('handling null ', () => {
  const MaybeNull = (props: { nullify: boolean }) =>
    props.nullify ? null : <div>not null</div>
  it('handles null', () => {
    const component = isolateComponent(<MaybeNull nullify={true} />)
    assert.strictEqual(component.content(), null)
    assert.strictEqual(component.toString(), '')
  })

  it('can update props on component that returns null', () => {
    const component = isolateComponent(<MaybeNull nullify={true} />)
    component.setProps({
      nullify: false,
    })

    assert.strictEqual(component.findOne('div').content(), 'not null')
    assert.strictEqual(
      component.findOne('div').toString(),
      `<div>not null</div>`
    )
  })

  it('handles null fragment return', () => {
    const EmptyFragment = () => <>{false}</>
    const component = isolateComponent(<EmptyFragment />)
    assert.strictEqual(component.content(), '')
  })
})
