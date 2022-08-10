import { describe, it } from 'mocha'
import { expect } from 'chai'
import React, { useContext, useEffect, useState } from 'react'
import {
  isolateComponent,
  isolateComponentTree,
} from '../../src/isolateComponent'

const HelloContext = React.createContext<{
  name: string
  setName: (name: string) => void
}>({ name: 'Ford', setName: () => {} })

describe('context provider and consumer', () => {
  const HelloDisplay = () => {
    return (
      <HelloContext.Consumer>
        {({ name }) => {
          return <div>Hello {name}</div>
        }}
      </HelloContext.Consumer>
    )
  }
  const HelloContextExample = (props: { name: string }) => {
    const [name, setName] = useState(props.name)
    return (
      <HelloContext.Provider value={{ name, setName }}>
        <HelloDisplay />
      </HelloContext.Provider>
    )
  }

  it('can consume a value from provider', () => {
    const isolated = isolateComponent(<HelloContextExample name="Arthur" />)

    isolated.inline('*')

    expect(isolated.content()).to.eq('<div>Hello Arthur</div>')
  })

  it('can consume a value from provider component', () => {
    const isolated = isolateComponent(
      <HelloContext.Provider value={{ name: 'Zaphod', setName: () => {} }}>
        <HelloDisplay />
      </HelloContext.Provider>
    )

    isolated.inline('*')

    expect(isolated.content()).to.eq('<div>Hello Zaphod</div>')
  })

  it('can consume an explicitly set value', () => {
    const isolated = isolateComponent(
      <HelloContext.Consumer>
        {({ name }) => <div>Hello {name}</div>}
      </HelloContext.Consumer>
    )

    isolated.inline('*')
    isolated.setContext(HelloContext, { name: 'Trillian', setName: () => {} })

    expect(isolated.toString()).to.eq('<div>Hello Trillian</div>')
  })

  it('can setContext', () => {
    const isolated = isolateComponent(<HelloDisplay />)

    isolated.inline('*')
    isolated.setContext(HelloContext, { name: 'Trillian', setName: () => {} })

    expect(isolated.toString()).to.eq('<div>Hello Trillian</div>')
  })

  it('can update value from within consumer in an effect', () => {
    const HelloStateProvider = (props: {
      name: string
      children: React.ReactNode
    }) => {
      const [name, setName] = useState(props.name)
      return (
        <HelloContext.Provider value={{ name, setName }}>
          {props.children}
        </HelloContext.Provider>
      )
    }
    const UpdateName = (props: { name: string }) => {
      return (
        <HelloContext.Consumer>
          {({ setName, name }) => {
            useEffect(() => {
              if (name !== props.name) {
                setName(props.name)
              }
            }, [setName, name])
            return null
          }}
        </HelloContext.Consumer>
      )
    }

    const UseContext = () => {
      const { name, setName } = useContext(HelloContext)
      return <button onClick={() => setName('Trillian')}>{name}</button>
    }

    const isolated = isolateComponentTree(
      <HelloStateProvider name="Zaphod">
        <HelloDisplay />
        <UpdateName name="Arthur" />
        <UseContext />
      </HelloStateProvider>
    )

    isolated.setContext(HelloContext, { name: 'Booty', setName: () => {} })

    expect(isolated.findOne('div').content()).to.eq('Hello Arthur')
  })
})
