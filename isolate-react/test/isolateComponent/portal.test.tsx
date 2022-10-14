import { describe, test } from 'mocha'
import React from 'react'
import ReactDOM from 'react-dom'
import { isolateComponent } from '../../src/isolateComponent'
import assert from 'node:assert'

describe('portals', () => {
  test('renders portal content', () => {
    const element = { nodeType: 1 }

    const ExamplePortalizer = () => {
      return ReactDOM.createPortal(<div />, element as any)
    }

    const isolated = isolateComponent(<ExamplePortalizer />)

    assert.strictEqual(isolated.toString(), '<div />')
  })
})
