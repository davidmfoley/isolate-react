import React from 'react'
import { describe, test } from 'mocha'
import { nodeTree } from '.'
import { isolatedRenderer } from '../isolatedRenderer'
import { RenderContext } from '../isolatedRenderer/renderContext'
import assert from 'node:assert'

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
    assert.strictEqual(after, before)
  })

  test('handles fragment reconciliaion', () => {
    const Child = () => <div>child</div>
    const Parent = () => (
      <>
        <Child />
      </>
    )

    const tree = testNodeTree(Parent(), true)
    assert.strictEqual(tree.content(), '<div>child</div>')
    tree.update(Parent())
    assert.strictEqual(tree.content(), '<div>child</div>')
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
    assert.strictEqual(tree.toString(), '<Parent><Child /></Parent>')

    tree.update(
      <Parent>
        <Child />
        <Child />
      </Parent>
    )

    assert.strictEqual(tree.toString(), '<Parent><Child /><Child /></Parent>')
  })
})
