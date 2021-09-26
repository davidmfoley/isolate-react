import { describe, it } from 'mocha'
import React from 'react'
import { expect } from 'chai'
import { isolateComponent } from '../src'

describe('children', () => {
  const ToggleChildren: React.FC<{ show: boolean }> = (props) => {
    if (props.show) return <>{props.children}</>
    return <></>
  }

  it('handles children', () => {
    const isolated = isolateComponent(
      <ToggleChildren show={true}>
        <div id="yah" />
      </ToggleChildren>
    )
    expect(isolated.exists('div')).to.eq(true)
  })

  it('handles untoggling children', () => {
    const isolated = isolateComponent(
      <ToggleChildren show={true}>
        <div id="yah" />
      </ToggleChildren>
    )
    expect(isolated.exists('div')).to.eq(true)
    isolated.mergeProps({ show: false })
    expect(isolated.exists('div')).to.eq(false)
  })

  it('handles toggling children', () => {
    const isolated = isolateComponent(
      <ToggleChildren show={false}>
        <div id="yah" />
      </ToggleChildren>
    )

    isolated.mergeProps({ show: true })
    expect(isolated.exists('div')).to.eq(true)
  })

  describe('inlined', () => {
    const Wrapper: React.FC<{ show: boolean }> = (props) => (
      <ToggleChildren show={props.show}>{props.children}</ToggleChildren>
    )

    it('handles inlined component with children', () => {
      const isolated = isolateComponent(
        <Wrapper show={true}>
          <div />
        </Wrapper>
      )
      isolated.inline(ToggleChildren)
      expect(isolated.exists('div')).to.eq(true)
    })

    it('passes down children', () => {
      const isolated = isolateComponent(
        <Wrapper show={true}>
          <div />
        </Wrapper>
      )
      const inner = isolated.findOne(ToggleChildren)
      expect(inner.children.length).to.eq(1)
    })

    it('handles cascading props down to inlined component with children', () => {
      const isolated = isolateComponent(
        <Wrapper show={false}>
          <div />
        </Wrapper>
      )
      isolated.inline(ToggleChildren)
      expect(isolated.exists('div')).to.eq(false)
      isolated.mergeProps({ show: true })
      expect(isolated.exists('div')).to.eq(true)
      isolated.mergeProps({ show: false })
      expect(isolated.exists('div')).to.eq(false)
    })
  })
})
