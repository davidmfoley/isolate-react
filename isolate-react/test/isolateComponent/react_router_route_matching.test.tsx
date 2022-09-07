import { describe, it } from 'mocha'
import { isolateComponent } from '../../src/isolateComponent'
import React from 'react'
import assert from 'node:assert'
import { Route, MemoryRouter, useParams } from 'react-router-dom'

const HelloRoute = () => {
  const params = useParams<{ name: string }>()
  return <div id="hello">Hello {params.name}</div>
}

describe('react router', () => {
  it('can render a react router route', () => {
    const isolated = isolateComponent(
      <MemoryRouter initialEntries={['/hello/Trillian']} y>
        <Route path="/hello/:name">
          <HelloRoute />
        </Route>
      </MemoryRouter>
    )

    isolated.inline('*')
    const name = isolated.findOne('#hello')

    assert.equal(name.content(), 'Hello Trillian')
  })
})
