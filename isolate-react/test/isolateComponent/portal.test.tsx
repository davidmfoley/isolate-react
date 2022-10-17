import { describe, test } from 'mocha'
import React from 'react'
import ReactDOM from 'react-dom'
import { isolateComponent } from '../../src/isolateComponent'
import assert from 'node:assert'

// https://developer.mozilla.org/en-US/docs/Web/API/Node/nodeType
const ELEMENT_NODE = 1

describe('portals', () => {
  // createPortal accepts a DOM Node, this is a partial
  // implementation of just enough to fool react's guard
  const fakePortalDomElement = { nodeType: ELEMENT_NODE } as any

  test('render portal content', () => {
    const ExamplePortalizer = () =>
      ReactDOM.createPortal(<div />, fakePortalDomElement as any)

    const isolated = isolateComponent(<ExamplePortalizer />)

    assert.strictEqual(isolated.toString(), '<div />')
  })

  test('inline component inside portal', () => {
    const Hello = ({ name }) => <span>Hello {name}</span>

    const ComponentInsidePortal = ({ name }) =>
      ReactDOM.createPortal(<Hello name={name} />, fakePortalDomElement as any)

    const isolated = isolateComponent(<ComponentInsidePortal name="Arthur" />)
    isolated.inline(Hello)

    assert.strictEqual(isolated.toString(), '<span>Hello Arthur</span>')
  })
})
