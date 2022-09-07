import { describe, it } from 'mocha'
import React from 'react'
import { isolateComponent } from '../../src/isolateComponent'
import assert from 'node:assert'

describe('getting component content', () => {
  const Answer = ({ answer }: { answer: number }) => (
    <span>The answer is {answer}</span>
  )

  it('content() returns inner content', () => {
    const answer = isolateComponent(<Answer answer={42} />)
    assert.strictEqual(answer.content(), 'The answer is 42')
  })

  it('toString() returns outer content', () => {
    const answer = isolateComponent(<Answer answer={42} />)
    assert.strictEqual(answer.toString(), '<span>The answer is 42</span>')
  })

  it('handles child text', () => {
    const Parent = (props: { children: React.ReactNode }) => (
      <div>{props.children}</div>
    )
    const Child = (_: { children: React.ReactNode }) => undefined
    const isolated = isolateComponent(
      <Parent>
        <Child>a b c</Child>
      </Parent>
    )
    assert.strictEqual(isolated.content(), '<Child>a b c</Child>')
    assert.strictEqual(isolated.toString(), '<div><Child>a b c</Child></div>')
  })

  it('handles fragments', () => {
    const FragmentExample = () => (
      <>
        <div>A</div>
        <div>B</div>
      </>
    )

    const isolated = isolateComponent(<FragmentExample />)
    assert.strictEqual(isolated.content(), '<div>A</div><div>B</div>')
  })

  it('handles child function', () => {
    const FunctionExample = () => <div>{(() => '42') as any}</div>

    const isolated = isolateComponent(<FunctionExample />)
    assert.strictEqual(isolated.content(), '[Function]')
    assert.strictEqual(isolated.toString(), '<div>[Function]</div>')
  })

  it('handles deep fragments', () => {
    const FragmentExample: React.FC<{}> = () => (
      <section>
        <>
          <div>A</div>
          <div>B</div>
        </>
      </section>
    )

    const isolated = isolateComponent(<FragmentExample />)
    assert.strictEqual(isolated.content(), '<div>A</div><div>B</div>')
    assert.strictEqual(
      isolated.toString(),
      '<section><div>A</div><div>B</div></section>'
    )
  })

  it('handles array at top level', () => {
    // typescript doesn't support this but it is valid react
    const ArrayExample: any = () => [<div key="0">A</div>, <div key="1">B</div>]

    const isolated = isolateComponent(<ArrayExample />)
    assert.strictEqual(isolated.content(), '<div>A</div><div>B</div>')
  })

  it('handles updating inlined components', () => {
    const Div = ({ children }: { children: React.ReactNode }) => (
      <div>{children}</div>
    )

    const Example = (props: { items: string[] }) => (
      <section>
        {props.items.map((x, i) => (
          <Div key={i}>{x}</Div>
        ))}
      </section>
    )

    const isolated = isolateComponent(<Example items={['A']} />)

    isolated.inline('*')

    assert.strictEqual(isolated.content(), '<div>A</div>')

    isolated.setProps({ items: ['A', 'B'] })
    assert.strictEqual(isolated.content(), '<div>A</div><div>B</div>')
  })
})
