import { describe, it } from 'mocha'
import React from 'react'
import assert from 'node:assert'
import { isolateComponent } from '../../src/isolateComponent'

describe('children', () => {
  const ToggleChildren = (props: {
    show: boolean
    children: React.ReactNode
  }) => {
    if (props.show) return <>{props.children}</>
    return <></>
  }

  it('handles children', () => {
    const isolated = isolateComponent(
      <ToggleChildren show={true}>
        <div id="yah" />
      </ToggleChildren>
    )
    assert.strictEqual(isolated.exists('div'), true)
  })

  it('handles untoggling children', () => {
    const isolated = isolateComponent(
      <ToggleChildren show={true}>
        <div id="yah" />
      </ToggleChildren>
    )
    assert.strictEqual(isolated.exists('div'), true)
    isolated.mergeProps({ show: false })
    assert.strictEqual(isolated.exists('div'), false)
  })

  it('handles toggling children', () => {
    const isolated = isolateComponent(
      <ToggleChildren show={false}>
        <div id="yah" />
      </ToggleChildren>
    )

    isolated.mergeProps({ show: true })
    assert.strictEqual(isolated.exists('div'), true)
  })

  describe('inlined', () => {
    const Wrapper = (props: { show: boolean; children: React.ReactNode }) => (
      <ToggleChildren show={props.show}>{props.children}</ToggleChildren>
    )

    it('handles inlined component with children', () => {
      const isolated = isolateComponent(
        <Wrapper show={true}>
          <div />
        </Wrapper>
      )
      isolated.inline(ToggleChildren)
      assert.strictEqual(isolated.exists('div'), true)
    })

    it('passes down children', () => {
      const isolated = isolateComponent(
        <Wrapper show={true}>
          <div />
        </Wrapper>
      )
      const inner = isolated.findOne(ToggleChildren)
      assert.strictEqual(inner.children.length, 1)
    })

    it('handles cascading props down to inlined component with children', () => {
      const isolated = isolateComponent(
        <Wrapper show={false}>
          <div />
        </Wrapper>
      )
      isolated.inline(ToggleChildren)
      assert.strictEqual(isolated.exists('div'), false)
      isolated.mergeProps({ show: true })
      assert.strictEqual(isolated.exists('div'), true)
      isolated.mergeProps({ show: false })
      assert.strictEqual(isolated.exists('div'), false)
    })
  })
})
