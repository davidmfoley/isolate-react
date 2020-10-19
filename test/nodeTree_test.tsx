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

  it('handles stringifying numbers in content', () => {
    const tree = nodeTree(<span>{3}</span>)
    expect(tree.root().content()).to.eq('3')
  })

  it('handles stringifying numbers in props', () => {
    const MagicNumber = (_: { value: number }) => null
    const tree = nodeTree(<MagicNumber value={3} />)

    expect(tree.root().toString()).to.eq(`<MagicNumber value={3} />`)
  })

  it('handles an empty fragment', () => {
    const parsed = nodeTree(<></>)
    expect(parsed.root().toString()).to.eq('')
  })

  it('handles a fragment with a false boolean value', () => {
    const parsed = nodeTree(<>{false}</>)
    expect(parsed.root().toString()).to.eq('')
  })

  it('handles false', () => {
    const parsed = nodeTree(false)
    expect(parsed.root().toString()).to.eq('')
  })

  it('handles true', () => {
    const parsed = nodeTree(true)
    expect(parsed.root().toString()).to.eq('')
  })

  it('handles undefined', () => {
    const parsed = nodeTree(undefined)
    expect(parsed.root().toString()).to.eq('')
  })

  it('exposes content via content() and toString()', () => {
    const List: React.FC<{ className: string }> = () => null
    const ListItem: React.FC<{}> = () => null
    const tree = nodeTree(
      <List className="listy-list">
        <ListItem>Arthur</ListItem>
        <ListItem>Trillian</ListItem>
      </List>
    )
    const root = tree.root()

    expect(root.content()).to.eq(
      '<ListItem>Arthur</ListItem><ListItem>Trillian</ListItem>'
    )

    expect(root.toString()).to.eq(
      '<List className="listy-list"><ListItem>Arthur</ListItem><ListItem>Trillian</ListItem></List>'
    )
  })
})
