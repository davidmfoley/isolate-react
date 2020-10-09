import { describe, it } from 'mocha'
import React from 'react'
import { nodeTree } from '../src/nodeTree'
import { expect } from 'chai'

describe('nodeTree ', () => {
  it('can parse a single html element', () => {
    const tree = nodeTree(<div />)
    const root = tree.root()

    expect(root.nodeType).to.eq('html')
    expect(root.type).to.eq('div')
    expect(root.children).to.eql([])
  })

  it('can parse a single component', () => {
    const Example = () => <div />
    const tree = nodeTree(<Example />)
    const root = tree.root()

    expect(root.nodeType).to.eq('react')
    expect(root.type).to.eq(Example)
    expect(root.children).to.eql([])
  })

  it('can parse children', () => {
    const Parent = ({ children }) => <div>{children}</div>
    const Child = () => <div />
    const tree = nodeTree(
      <Parent>
        <Child />
      </Parent>
    )
    const root = tree.root()

    expect(root.nodeType).to.eq('react')
    expect(root.type).to.eq(Parent)
    expect(root.children.length).to.eql(1)
    expect(root.children[0].type).to.eql(Child)
  })
})
