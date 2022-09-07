import { describe, it } from 'mocha'
import React, { useContext } from 'react'
import { isolateComponent } from '../../src/isolateComponent'
import assert from 'node:assert'

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

  const TestComponent = (props: { children: React.ReactNode }) => (
    <section>{props.children}</section>
  )

  const PropsToContext = (props: {
    name: string
    children: React.ReactNode
  }) => (
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
      assert.strictEqual(isolated.findOne('div').content(), 'Ford')
    })

    it('can get provided context in consumer', () => {
      const isolated = isolateComponent(
        <NameContext.Provider value="Ford">
          <ConsumerDisplayName />
        </NameContext.Provider>
      )

      isolated.inline('*')
      assert.strictEqual(isolated.findOne('div').content(), 'Ford')
    })

    it('can change value of context provider with props', () => {
      const isolated = isolateComponent(
        <NameContext.Provider value="Ford">
          <DisplayName />
        </NameContext.Provider>
      )

      isolated.inline('*')
      isolated.mergeProps({ value: 'Zaphod' })
      assert.strictEqual(isolated.findOne('div').content(), 'Zaphod')
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
      assert.strictEqual(isolated.findOne('div').content(), 'Trillian')
    })
  })

  it('supports default context value', () => {
    const isolated = isolateComponent(
      <TestComponent>
        <DisplayName />
      </TestComponent>
    )

    isolated.inline('*')
    assert.strictEqual(isolated.findOne('div').content(), 'Arthur')
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
    assert.strictEqual(isolated.findOne('div').content(), 'Zaphod')
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
      assert.strictEqual(isolated.findOne('div').content(), 'Zaphod')
    })

    it('can setContext after inline', () => {
      const isolated = isolateComponent(
        <TestComponent>
          <DisplayName />
        </TestComponent>
      )

      isolated.inline('*')
      isolated.setContext(NameContext, 'Zaphod')
      assert.strictEqual(isolated.findOne('div').content(), 'Zaphod')
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
      assert.strictEqual(isolated.findOne('div').content(), 'Trillian')
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

    assert.strictEqual(isolated.findOne('div').content(), 'Trillian')
  })

  describe('context provider at top level', () => {
    it('handles context provider at top level', () => {
      const isolated = isolateComponent(
        <PropsToContext name="Arthur">
          <DisplayName />
        </PropsToContext>
      )

      isolated.inline('*')
      assert.strictEqual(isolated.findOne('div').content(), 'Arthur')
      assert.strictEqual(isolated.content(), '<div>Arthur</div>')
      assert.strictEqual(isolated.toString(), '<div>Arthur</div>')
    })

    it('handles context provider with changing value', () => {
      const isolated = isolateComponent(
        <PropsToContext name="Arthur">
          <DisplayName />
        </PropsToContext>
      )

      isolated.inline('*')
      isolated.mergeProps({ name: 'Trillian' })

      assert.strictEqual(isolated.content(), '<div>Trillian</div>')
      assert.strictEqual(isolated.toString(), '<div>Trillian</div>')
      assert.strictEqual(isolated.findOne('div').content(), 'Trillian')
    })

    it('renders context value when inline then update', () => {
      const isolated = isolateComponent(
        <NameContext.Provider value="Arthur">
          <DisplayName />
        </NameContext.Provider>
      )
      isolated.inline('*')
      isolated.mergeProps({ value: 'Trillian' })

      assert.strictEqual(isolated.content(), '<div>Trillian</div>')
      assert.strictEqual(isolated.toString(), '<div>Trillian</div>')
      assert.strictEqual(isolated.findOne('div').content(), 'Trillian')
    })

    it('renders context value when update props then inline', () => {
      const isolated = isolateComponent(
        <NameContext.Provider value="Arthur">
          <DisplayName />
        </NameContext.Provider>
      )
      isolated.mergeProps({ value: 'Trillian' })
      isolated.inline('*')

      assert.strictEqual(isolated.content(), '<div>Trillian</div>')
      assert.strictEqual(isolated.toString(), '<div>Trillian</div>')
      assert.strictEqual(isolated.findOne('div').content(), 'Trillian')
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
    assert.deepEqual(names, ['Trillian', 'Arthur'])
  })
})
