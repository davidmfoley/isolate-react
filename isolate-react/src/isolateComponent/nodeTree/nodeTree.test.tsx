import { describe, it } from 'mocha'
import React from 'react'
import { nodeTree } from '../nodeTree'
import { IsolatedRenderer } from '../isolatedRenderer'
import { disableReactWarnings } from '../../../test/isolateComponent/disableReactWarnings'
import assert from 'node:assert'

const nullRenderer: IsolatedRenderer = {
  render: () => ({} as any),
  shouldInline: () => false,
}

const getNullRenderer = () => nullRenderer

const nullShouldInline = () => false

describe('nodeTree ', () => {
  disableReactWarnings()
  it('can parse a single html element', () => {
    const tree = nodeTree(<div />, getNullRenderer, nullShouldInline)
    const root = tree.root()

    assert.strictEqual(root.nodeType, 'html')
    assert.strictEqual(root.type, 'div')
    assert.deepStrictEqual(root.children, [])
  })

  it('can parse a single component', () => {
    const Example = () => <div />
    const tree = nodeTree(<Example />, getNullRenderer, nullShouldInline)
    const root = tree.root()

    assert.strictEqual(root.nodeType, 'react')
    assert.strictEqual(root.type, Example)
    assert.deepEqual(root.children, [])
  })

  it('can parse an invalid null react element', () => {
    const Null = null as any
    const tree = nodeTree(
      <div>
        <Null />
      </div>,
      getNullRenderer,
      nullShouldInline
    )
    const root = tree.root()

    assert.strictEqual(root.nodeType, 'html')
    assert.strictEqual(root.type, 'div')
    assert.strictEqual(root.children.length, 1)

    const [nullNode] = root.children
    assert.strictEqual(nullNode.nodeType, 'invalid')

    assert.deepEqual(tree.invalidNodePaths(), [['div', 'null']])
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

    assert.strictEqual(root.nodeType, 'react')
    assert.strictEqual(root.type, ExampleContext.Provider)
    assert.strictEqual(root.children.length, 1)
    assert.strictEqual(root.children[0].type, ExampleContext.Consumer)
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

    assert.strictEqual(root.nodeType, 'react')
    assert.strictEqual(root.type, Parent)
    assert.strictEqual(root.children.length, 1)
    assert.strictEqual(root.children[0].type, Child)
  })

  it('can parse children that are functions', () => {
    const Parent = ({ children }) => <div>{children}</div>
    const tree = nodeTree(
      <Parent>{() => 'hi'}</Parent>,
      getNullRenderer,
      nullShouldInline
    )
    const root = tree.root()

    assert.strictEqual(root.nodeType, 'react')
    assert.strictEqual(root.type, Parent)
    assert.strictEqual(root.children.length, 1)

    const fn = root.children[0].type as any as Function

    assert.strictEqual(typeof fn, 'function')
    assert.strictEqual(fn(), 'hi')
  })

  it('throws non-ridiculous errors with child functions', () => {
    const Parent = ({ children }) => <div>{children}</div>
    const tree = nodeTree(
      <Parent>{() => 'hi'}</Parent>,
      getNullRenderer,
      nullShouldInline
    )
    // don't include the function body in the error message
    assert.throws(() => tree.findOne('li'), /<Parent>\[Function\]/)
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

    assert.strictEqual(section.exists('ul'), true)
    assert.strictEqual(section.exists('div'), false)

    assert.strictEqual(section.findAll('li').length, 2)
    section.findOne('ul')

    assert.throws(() => section.findOne('div'))
    assert.throws(() => section.findOne('li'))

    section.findOne('ul').findAll('li')[1].findOne('span')
  })

  it('handles stringifying numbers in content', () => {
    const tree = nodeTree(<span>{3}</span>, getNullRenderer, nullShouldInline)
    assert.strictEqual(tree.root().content(), '3')
  })

  it('handles stringifying numbers in props', () => {
    const MagicNumber = (_: { value: number }) => null
    const tree = nodeTree(
      <MagicNumber value={3} />,
      getNullRenderer,
      nullShouldInline
    )

    assert.strictEqual(tree.root().toString(), `<MagicNumber value={3} />`)
  })

  it('handles stringifying functions in content', () => {
    const tree = nodeTree(
      <span>{((a: string) => 42) as any}</span>,
      getNullRenderer,
      nullShouldInline
    )
    assert.strictEqual(tree.root().content(), '[Function]')
    assert.strictEqual(tree.root().toString(), '<span>[Function]</span>')
  })

  it('handles an empty fragment', () => {
    const parsed = nodeTree(<></>, getNullRenderer, nullShouldInline)
    assert.strictEqual(parsed.root().toString(), '')
  })

  it('handles a fragment with a false boolean value', () => {
    const parsed = nodeTree(<>{false}</>, getNullRenderer, nullShouldInline)
    assert.strictEqual(parsed.root().toString(), '')
  })

  it('handles false', () => {
    const parsed = nodeTree(false, getNullRenderer, nullShouldInline)
    assert.strictEqual(parsed.root().toString(), '')
  })

  it('handles true', () => {
    const parsed = nodeTree(true, getNullRenderer, nullShouldInline)
    assert.strictEqual(parsed.root().toString(), '')
  })

  it('handles undefined', () => {
    const parsed = nodeTree(undefined, getNullRenderer, nullShouldInline)
    assert.strictEqual(parsed.root().toString(), '')
  })

  it('exposes content via content() and toString()', () => {
    const List = (props: { className: string; children: React.ReactNode }) =>
      null
    const ListItem = (props: { children: React.ReactNode }) => null
    const tree = nodeTree(
      <List className="listy-list">
        <ListItem>Arthur</ListItem>
        <ListItem>Trillian</ListItem>
      </List>,
      getNullRenderer,
      nullShouldInline
    )
    const root = tree.root()

    assert.strictEqual(
      root.content(),
      '<ListItem>Arthur</ListItem><ListItem>Trillian</ListItem>'
    )

    assert.strictEqual(
      root.toString(),
      '<List className="listy-list"><ListItem>Arthur</ListItem><ListItem>Trillian</ListItem></List>'
    )
  })
})
