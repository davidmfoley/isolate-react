import { describe, it } from 'mocha'
import React from 'react'
import { nodeTree } from '../../src/isolateComponent/nodeTree'
import { expect } from 'chai'
import { IsolatedRenderer } from '../../src/isolateComponent/isolatedRenderer'

const nullRenderer: IsolatedRenderer = {
  render: () => ({} as any),
  shouldInline: () => false,
}

const getNullRenderer = () => nullRenderer

const nullShouldInline = () => false

describe('nodeTree ', () => {
  it('can parse a single html element', () => {
    const tree = nodeTree(<div />, getNullRenderer, nullShouldInline)
    const root = tree.root()

    expect(root.nodeType).to.eq('html')
    expect(root.type).to.eq('div')
    expect(root.children).to.eql([])
  })

  it('can parse a single component', () => {
    const Example = () => <div />
    const tree = nodeTree(<Example />, getNullRenderer, nullShouldInline)
    const root = tree.root()

    expect(root.nodeType).to.eq('react')
    expect(root.type).to.eq(Example)
    expect(root.children).to.eql([])
  })

  it('can parse context provider', () => {
    const ExampleContext = React.createContext(3)
    const tree = nodeTree(
      <ExampleContext.Provider value={3}>
        <ExampleContext.Consumer>
          {(v) => <div>{v}v</div>}
        </ExampleContext.Consumer>
      </ExampleContext.Provider>,
      getNullRenderer,
      nullShouldInline
    )
    const root = tree.root()

    expect(root.nodeType).to.eq('react')
    expect(root.type).to.eq(ExampleContext.Provider)
    expect(root.children.length).to.eql(1)
    expect(root.children[0].type).to.eql(ExampleContext.Consumer)
  })

  it('can parse children', () => {
    const Parent = ({ children }) => <div>{children}</div>
    const Child = () => <div />
    const tree = nodeTree(
      <Parent>
        <Child />
      </Parent>,
      getNullRenderer,
      nullShouldInline
    )
    const root = tree.root()

    expect(root.nodeType).to.eq('react')
    expect(root.type).to.eq(Parent)
    expect(root.children.length).to.eql(1)
    expect(root.children[0].type).to.eql(Child)
  })

  it('can parse children that are functions', () => {
    const Parent = ({ children }) => <div>{children}</div>
    const tree = nodeTree(
      <Parent>{() => 'hi'}</Parent>,
      getNullRenderer,
      nullShouldInline
    )
    const root = tree.root()

    expect(root.nodeType).to.eq('react')
    expect(root.type).to.eq(Parent)
    expect(root.children.length).to.eql(1)

    const fn = root.children[0].type as any as Function

    expect(typeof fn).to.eq('function')
    expect(fn()).to.eql('hi')
  })

  it('throws non-ridiculous errors with child functions', () => {
    const Parent = ({ children }) => <div>{children}</div>
    const tree = nodeTree(
      <Parent>{() => 'hi'}</Parent>,
      getNullRenderer,
      nullShouldInline
    )
    // don't include the function body in the error message
    expect(() => tree.findOne('li')).to.throw(/<Parent>\[Function\]/)
  })

  it('can find children', () => {
    const tree = nodeTree(
      <section>
        <ul>
          <li>A</li>
          <li>
            <span>B</span>
          </li>
        </ul>
      </section>,
      getNullRenderer,
      nullShouldInline
    )

    const section = tree.findOne('section')

    expect(section.exists('ul')).to.eq(true)
    expect(section.exists('div')).to.eq(false)

    expect(section.findAll('li').length).to.eq(2)
    section.findOne('ul')

    expect(() => section.findOne('div')).to.throw()
    expect(() => section.findOne('li')).to.throw()

    section.findOne('ul').findAll('li')[1].findOne('span')
  })

  it('handles stringifying numbers in content', () => {
    const tree = nodeTree(<span>{3}</span>, getNullRenderer, nullShouldInline)
    expect(tree.root().content()).to.eq('3')
  })

  it('handles stringifying numbers in props', () => {
    const MagicNumber = (_: { value: number }) => null
    const tree = nodeTree(
      <MagicNumber value={3} />,
      getNullRenderer,
      nullShouldInline
    )

    expect(tree.root().toString()).to.eq(`<MagicNumber value={3} />`)
  })

  it('handles stringifying functions in content', () => {
    const tree = nodeTree(
      <span>{(a: string) => 42}</span>,
      getNullRenderer,
      nullShouldInline
    )
    expect(tree.root().content()).to.eq('[Function]')
    expect(tree.root().toString()).to.eq('<span>[Function]</span>')
  })

  it('handles an empty fragment', () => {
    const parsed = nodeTree(<></>, getNullRenderer, nullShouldInline)
    expect(parsed.root().toString()).to.eq('')
  })

  it('handles a fragment with a false boolean value', () => {
    const parsed = nodeTree(<>{false}</>, getNullRenderer, nullShouldInline)
    expect(parsed.root().toString()).to.eq('')
  })

  it('handles false', () => {
    const parsed = nodeTree(false, getNullRenderer, nullShouldInline)
    expect(parsed.root().toString()).to.eq('')
  })

  it('handles true', () => {
    const parsed = nodeTree(true, getNullRenderer, nullShouldInline)
    expect(parsed.root().toString()).to.eq('')
  })

  it('handles undefined', () => {
    const parsed = nodeTree(undefined, getNullRenderer, nullShouldInline)
    expect(parsed.root().toString()).to.eq('')
  })

  it('exposes content via content() and toString()', () => {
    const List: React.FC<{ className: string }> = () => null
    const ListItem: React.FC<{}> = () => null
    const tree = nodeTree(
      <List className="listy-list">
        <ListItem>Arthur</ListItem>
        <ListItem>Trillian</ListItem>
      </List>,
      getNullRenderer,
      nullShouldInline
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
