import { describe, it } from 'mocha'
import { expect } from 'chai'
import { isolateComponent } from '../../src/isolateComponent'
import React from 'react'

const FunctionWrapper = ({
  name,
  children,
}: {
  name: string
  children: (name: string) => any
}) => <>{children(name)}</>

describe('function as child', () => {
  it('can render', () => {
    const isolated = isolateComponent(
      <FunctionWrapper name="Trillian">
        {(arg) => <div>Hello {arg}</div>}
      </FunctionWrapper>
    )

    expect(isolated.toString()).to.eq('<div>Hello Trillian</div>')
  })

  it('can inline', () => {
    const Outer = (props: { children: React.ReactNode }) => (
      <section>{props.children}</section>
    )
    const isolated = isolateComponent(
      <Outer>
        <FunctionWrapper name="Trillian">
          {(arg) => <div>Hello {arg}</div>}
        </FunctionWrapper>
      </Outer>
    )

    isolated.inline('*')

    expect(isolated.toString()).to.eq(
      '<section><div>Hello Trillian</div></section>'
    )
  })
})
