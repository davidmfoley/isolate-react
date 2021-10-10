import { describe, it } from 'mocha'
import { expect } from 'chai'
import { isolateComponent } from '../src'
import React from 'react'
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

    expect(name.content()).to.equal('Hello Trillian')
  })
})
