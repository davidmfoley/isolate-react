import { describe, it } from 'mocha'
import React, { useContext } from 'react'
import { expect } from 'chai'
import { isolateComponent } from '../../src/isolateComponent'

describe('inline context', () => {
  const NameContext = React.createContext<string>('Arthur')

  const DisplayName = () => {
    return <div>{useContext(NameContext)}</div>
  }

  const ConsumerDisplayName = () => {
    return (
      <NameContext.Consumer>
        {(value) => <div>{value}</div>}
      </NameContext.Consumer>
    )
  }

  const TestComponent: React.FC<{}> = (props) => (
    <section>{props.children}</section>
  )

  const PropsToContext: React.FC<{ name: string }> = (props) => (
    <NameContext.Provider value={props.name}>
      {props.children}
    </NameContext.Provider>
  )

  describe('rendering context providers directly', () => {
    it('can render context provider', () => {
      const isolated = isolateComponent(
        <NameContext.Provider value="Ford">
          <DisplayName />
        </NameContext.Provider>
      )

      isolated.inline('*')
      expect(isolated.findOne('div').content()).to.eq('Ford')
    })

    it('can get provided context in consumer', () => {
      const isolated = isolateComponent(
        <NameContext.Provider value="Ford">
          <ConsumerDisplayName />
        </NameContext.Provider>
      )

      isolated.inline('*')
      expect(isolated.findOne('div').content()).to.eq('Ford')
    })

    it('can change value of context provider with props', () => {
      const isolated = isolateComponent(
        <NameContext.Provider value="Ford">
          <DisplayName />
        </NameContext.Provider>
      )

      isolated.inline('*')
      isolated.mergeProps({ value: 'Zaphod' })
      expect(isolated.findOne('div').content()).to.eq('Zaphod')
    })

    it('can render nested context providers', () => {
      const isolated = isolateComponent(
        <NameContext.Provider value="Ford">
          <NameContext.Provider value="Trillian">
            <DisplayName />
          </NameContext.Provider>
        </NameContext.Provider>
      )

      isolated.inline('*')
      expect(isolated.findOne('div').content()).to.eq('Trillian')
    })
  })

  it('supports default context value', () => {
    const isolated = isolateComponent(
      <TestComponent>
        <DisplayName />
      </TestComponent>
    )

    isolated.inline('*')
    expect(isolated.findOne('div').content()).to.eq('Arthur')
  })

  it('passes down withContext values', () => {
    const isolated = isolateComponent.withContext(
      NameContext,
      'Zaphod'
    )(
      <TestComponent>
        <DisplayName />
      </TestComponent>
    )
    isolated.inline('*')
    expect(isolated.findOne('div').content()).to.eq('Zaphod')
  })

  describe('updating context values', () => {
    it('passes down explicitly set context', () => {
      const isolated = isolateComponent(
        <TestComponent>
          <DisplayName />
        </TestComponent>
      )

      isolated.setContext(NameContext, 'Zaphod')
      isolated.inline('*')
      expect(isolated.findOne('div').content()).to.eq('Zaphod')
    })

    it('can setContext after inline', () => {
      const isolated = isolateComponent(
        <TestComponent>
          <DisplayName />
        </TestComponent>
      )

      isolated.inline('*')
      isolated.setContext(NameContext, 'Zaphod')
      expect(isolated.findOne('div').content()).to.eq('Zaphod')
    })

    it('overrides outer context with provider context', () => {
      const isolated = isolateComponent(
        <TestComponent>
          <NameContext.Provider value="Trillian">
            <DisplayName />
          </NameContext.Provider>
        </TestComponent>
      )

      isolated.inline('*')
      isolated.setContext(NameContext, 'Zaphod')
      expect(isolated.findOne('div').content()).to.eq('Trillian')
    })
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

  describe('context provider at top level', () => {
    it('handles context provider at top level', () => {
      const isolated = isolateComponent(
        <PropsToContext name="Arthur">
          <DisplayName />
        </PropsToContext>
      )

      isolated.inline('*')
      expect(isolated.findOne('div').content()).to.eq('Arthur')
      expect(isolated.content()).to.eq('<div>Arthur</div>')
      expect(isolated.toString()).to.eq('<div>Arthur</div>')
    })

    it('handles context provider with changing value', () => {
      const isolated = isolateComponent(
        <PropsToContext name="Arthur">
          <DisplayName />
        </PropsToContext>
      )

      isolated.inline('*')
      isolated.mergeProps({ name: 'Trillian' })

      expect(isolated.content()).to.eq('<div>Trillian</div>')
      expect(isolated.toString()).to.eq('<div>Trillian</div>')
      expect(isolated.findOne('div').content()).to.eq('Trillian')
    })

    it('renders context value when inline then update', () => {
      const isolated = isolateComponent(
        <NameContext.Provider value="Arthur">
          <DisplayName />
        </NameContext.Provider>
      )
      isolated.inline('*')
      isolated.mergeProps({ value: 'Trillian' })

      expect(isolated.content()).to.eq('<div>Trillian</div>')
      expect(isolated.toString()).to.eq('<div>Trillian</div>')
      expect(isolated.findOne('div').content()).to.eq('Trillian')
    })

    it('renders context value when update props then inline', () => {
      const isolated = isolateComponent(
        <NameContext.Provider value="Arthur">
          <DisplayName />
        </NameContext.Provider>
      )
      isolated.mergeProps({ value: 'Trillian' })
      isolated.inline('*')

      expect(isolated.content()).to.eq('<div>Trillian</div>')
      expect(isolated.toString()).to.eq('<div>Trillian</div>')
      expect(isolated.findOne('div').content()).to.eq('Trillian')
    })
  })

  it('handles nested context providers', () => {
    const isolated = isolateComponent(
      <NameContext.Provider value="Arthur">
        <NameContext.Provider value="Trillian">
          <DisplayName />
        </NameContext.Provider>
        <DisplayName />
      </NameContext.Provider>
    )

    isolated.inline('*')

    const names = isolated.findAll('div').map((d) => d.content())
    expect(names).to.eql(['Trillian', 'Arthur'])
  })
})
