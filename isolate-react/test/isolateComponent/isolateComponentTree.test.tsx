import { describe, it } from 'mocha'
import React from 'react'
import { expect } from 'chai'
import { isolateComponentTree } from '../../src/isolateComponent'

const Child = () => <div className="child"></div>
const Parent = () => (
  <div className="parent">
    <Child />
  </div>
)

describe('isolateComponentTree ', () => {
  it('inlines all children', () => {
    const isolated = isolateComponentTree(<Parent />)

    expect(isolated.exists('div.child')).to.eq(true)
  })
})
