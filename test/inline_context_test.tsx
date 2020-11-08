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

  it.skip('handles context provider', () => {
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
})
