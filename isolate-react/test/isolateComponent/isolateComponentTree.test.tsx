import { describe, it } from 'mocha'
import React from 'react'
import { isolateComponentTree } from '../../src/isolateComponent'
import assert from 'node:assert'

const Child = () => <div className="child"></div>
const Parent = () => (
  <div className="parent">
    <Child />
  </div>
)

describe('isolateComponentTree ', () => {
  it('inlines all children', () => {
    const isolated = isolateComponentTree(<Parent />)

    assert.ok(isolated.exists('div.child'))
  })
})
