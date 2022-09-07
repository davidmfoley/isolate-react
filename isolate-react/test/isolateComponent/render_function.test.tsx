import { describe, it } from 'mocha'
import assert from 'node:assert'
import {
  isolateComponent,
  isolateComponentTree,
} from '../../src/isolateComponent'
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

    assert.strictEqual(isolated.toString(), '<div>Hello Trillian</div>')
  })

  const Outer = (props: { children: React.ReactNode }) => (
    <section>{props.children}</section>
  )

  it('can inline', () => {
    const isolated = isolateComponent(
      <Outer>
        <FunctionWrapper name="Trillian">
          {(arg) => <div>Hello {arg}</div>}
        </FunctionWrapper>
      </Outer>
    )

    isolated.inline('*')

    assert.strictEqual(
      isolated.toString(),
      '<section><div>Hello Trillian</div></section>'
    )
  })

  it('works with isolateComponentTree', () => {
    const isolated = isolateComponentTree(
      <Outer>
        <FunctionWrapper name="Trillian">
          {(arg) => <div>Hello {arg}</div>}
        </FunctionWrapper>
      </Outer>
    )

    assert.strictEqual(
      isolated.toString(),
      '<section><div>Hello Trillian</div></section>'
    )
  })
})
