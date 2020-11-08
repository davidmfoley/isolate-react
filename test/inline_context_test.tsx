import { describe, it } from 'mocha'
import React, { useContext, useEffect } from 'react'
import { expect } from 'chai'
import { isolateComponent } from '../src'

describe('inline with context provider', () => {
  const NameContext = React.createContext<string>('Arthur')
  const DisplayName = () => <div>{useContext(NameContext)}</div>
  const TestComponent = (props) => <section>{props.children}</section>

  it('supports default context value', () => {
    const isolated = isolateComponent(
      <TestComponent>
        <DisplayName />
      </TestComponent>
    )

    isolated.inline('*')
    expect(isolated.findOne('div').content()).to.eq('Arthur')
  })

  it('handles context provider', () => {
    const isolated = isolateComponent(
      <TestComponent>
        <NameContext.Provider value="Trillian">
          <DisplayName />
        </NameContext.Provider>
      </TestComponent>
    )

    isolated.inline('*')

    expect(isolated.findOne('div').content()).to.eq('Trillian')
  })

  it('handles nested context providers', () => {
    const isolated = isolateComponent(
      <TestComponent>
        <DisplayName />
        <NameContext.Provider value="Trillian">
          <DisplayName />
          <NameContext.Provider value="Ford">
            <DisplayName />
          </NameContext.Provider>
          <DisplayName />
        </NameContext.Provider>
        <DisplayName />
      </TestComponent>
    )

    isolated.inline('*')

    const names = isolated.findAll('div').map((d) => d.content())
    expect(names).to.eql(['Arthur', 'Trillian', 'Ford', 'Trillian', 'Arthur'])
  })
})
