import React from 'react'
import { describe, test } from 'mocha'
import { expect } from 'chai'
import { nodeTree } from '.'
import { isolatedRenderer } from '../isolatedRenderer'
import { RenderContext } from '../isolatedRenderer/renderContext'

const fakeRenderContext = (): RenderContext => ({
  contexts: [],
  addInlinedSelector: () => {},
  shouldInline: () => true,
  withContext: fakeRenderContext,
  copy: fakeRenderContext,
})

const renderer = isolatedRenderer(fakeRenderContext())

const testNodeTree = (elements: any, shouldInline: boolean) =>
  nodeTree(
    elements,
    () => renderer,
    () => shouldInline
  )

describe('reconcile', () => {
  test('handles html reconciliaion', () => {
    const Child = () => <div>child</div>
    const Parent = () => (
      <div>
        <Child />
      </div>
    )

    const tree = testNodeTree(Parent(), true)
    const before = tree.content()

    tree.update(Parent())

    const after = tree.content()
    expect(after).to.eq(before)
  })

  test('handles fragment reconciliaion', () => {
    const Child = () => <div>child</div>
    const Parent = () => (
      <>
        <Child />
      </>
    )

    const tree = testNodeTree(Parent(), true)
    expect(tree.content()).to.eq('<div>child</div>')
    tree.update(Parent())
    expect(tree.content()).to.eq('<div>child</div>')
  })

  test('handles react reconciliaion', () => {
    const Child = () => <div>child</div>
    const Parent = ({ children }: { children: React.ReactNode }) => (
      <div>{children}</div>
    )

    const tree = testNodeTree(
      <Parent>
        <Child />
      </Parent>,
      false
    )
    expect(tree.toString()).to.eq('<Parent><Child /></Parent>')

    tree.update(
      <Parent>
        <Child />
        <Child />
      </Parent>
    )

    expect(tree.toString()).to.eq('<Parent><Child /><Child /></Parent>')
  })
})
