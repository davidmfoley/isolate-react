import { describe, it } from 'mocha'
import React from 'react'
import { isolateComponent } from '../../src/isolateComponent'
import { expect } from 'chai'

describe('getting component content', () => {
  const Answer = ({ answer }: { answer: number }) => (
    <span>The answer is {answer}</span>
  )

  it('content() returns inner content', () => {
    const answer = isolateComponent(<Answer answer={42} />)
    expect(answer.content()).to.eq('The answer is 42')
  })

  it('toString() returns outer content', () => {
    const answer = isolateComponent(<Answer answer={42} />)
    expect(answer.toString()).to.eq('<span>The answer is 42</span>')
  })

  it('handles child text', () => {
    const Parent = (props: { children: React.ReactNode }) => (
      <div>{props.children}</div>
    )
    const Child = (props: { children: React.ReactNode }) => undefined
    const isolated = isolateComponent(
      <Parent>
        <Child>a b c</Child>
      </Parent>
    )
    expect(isolated.content()).to.eq('<Child>a b c</Child>')
    expect(isolated.toString()).to.eq('<div><Child>a b c</Child></div>')
  })

  it('handles fragments', () => {
    const FragmentExample = () => (
      <>
        <div>A</div>
        <div>B</div>
      </>
    )

    const isolated = isolateComponent(<FragmentExample />)
    expect(isolated.content()).to.eq('<div>A</div><div>B</div>')
  })

  it('handles child function', () => {
    const FunctionExample = () => <div>{(() => '42') as any}</div>

    const isolated = isolateComponent(<FunctionExample />)
    expect(isolated.content()).to.eq('[Function]')
    expect(isolated.toString()).to.eq('<div>[Function]</div>')
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
    expect(isolated.content()).to.eq('<div>A</div><div>B</div>')
    expect(isolated.toString()).to.eq(
      '<section><div>A</div><div>B</div></section>'
    )
  })

  it('handles array at top level', () => {
    // typescript doesn't support this but it is valid react
    const ArrayExample: any = () => [<div key="0">A</div>, <div key="1">B</div>]

    const isolated = isolateComponent(<ArrayExample />)
    expect(isolated.content()).to.eq('<div>A</div><div>B</div>')
  })
})
