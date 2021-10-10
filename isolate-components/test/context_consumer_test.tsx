import { describe, it } from 'mocha'
import { expect } from 'chai'
import React from 'react'
import { isolateComponent } from '../src'

const HelloContext = React.createContext<string>('Ford')

describe('context provider and consumer', () => {
  const HelloDisplay = () => (
    <HelloContext.Consumer>
      {(name) => <div>Hello {name}</div>}
    </HelloContext.Consumer>
  )
  const HelloContextExample = (props: { name: string }) => (
    <HelloContext.Provider value={props.name}>
      <HelloDisplay />
    </HelloContext.Provider>
  )

  it('can consume a value from provider', () => {
    const isolated = isolateComponent(<HelloContextExample name="Arthur" />)

    isolated.inline('*')

    expect(isolated.content()).to.eq('<div>Hello Arthur</div>')
  })

  it('can consume a value from provider', () => {
    const isolated = isolateComponent(
      <HelloContext.Provider value="Zaphod">
        <HelloDisplay />
      </HelloContext.Provider>
    )

    isolated.inline('*')

    expect(isolated.content()).to.eq('<div>Hello Zaphod</div>')
  })

  it('can consume an explicit value', () => {
    const isolated = isolateComponent(
      <HelloContext.Consumer>
        {(name) => <div>Hello {name}</div>}
      </HelloContext.Consumer>
    )

    isolated.inline('*')
    isolated.setContext(HelloContext, 'Trillian')

    expect(isolated.toString()).to.eq('<div>Hello Trillian</div>')
  })

  it('can consume an explicit value', () => {
    const isolated = isolateComponent(<HelloDisplay />)

    isolated.inline('*')
    isolated.setContext(HelloContext, 'Trillian')

    expect(isolated.toString()).to.eq('<div>Hello Trillian</div>')
  })
})
