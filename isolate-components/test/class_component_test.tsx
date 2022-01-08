import { describe, it } from 'mocha'
import React, { ChangeEvent } from 'react'
import { isolateComponent, IsolatedComponent } from '../src'
import { expect } from 'chai'

describe('React class components', () => {
  describe('component with props only', () => {
    class PropsOnlyComponent extends React.Component<{ name: string }> {
      render() {
        return <div>Hello {this.props.name}</div>
      }
    }

    let isolated: IsolatedComponent<{ name: string }>

    beforeEach(() => {
      isolated = isolateComponent(<PropsOnlyComponent name="Trillian" />)
    })

    it('can render', () => {
      expect(isolated.toString()).to.eq('<div>Hello Trillian</div>')
    })

    it('can update props', () => {
      isolated.setProps({ name: 'Ford' })
      expect(isolated.toString()).to.eq('<div>Hello Ford</div>')
    })
  })

  describe('setState with an object', () => {
    class NameComponent extends React.Component<{}, { name: string }> {
      state = {
        name: 'Arthur',
      }
      render() {
        return (
          <input
            type="text"
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              this.setState({ name: e.target.value })
            }}
            value={this.state.name}
          />
        )
      }
    }

    let isolated: IsolatedComponent<{ name: string }>

    beforeEach(() => {
      isolated = isolateComponent(<NameComponent />)
    })

    it('populates state', () => {
      expect(isolated.findOne('input').props.value).to.eq('Arthur')
    })

    it('can update state', () => {
      isolated
        .findOne('input')
        .props.onChange({ target: { value: 'Trillian' } })

      expect(isolated.findOne('input').props.value).to.eq('Trillian')
    })
  })

  describe('setState with a function', () => {
    class NameComponent extends React.Component<{}, { name: string }> {
      state = {
        name: 'Arthur',
      }
      render() {
        return (
          <input
            type="text"
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              this.setState((s) => ({ ...s, name: e.target.value }))
            }}
            value={this.state.name}
          />
        )
      }
    }

    let isolated: IsolatedComponent<{ name: string }>

    beforeEach(() => {
      isolated = isolateComponent(<NameComponent />)
    })

    it('populates state', () => {
      expect(isolated.findOne('input').props.value).to.eq('Arthur')
    })

    it('can update state', () => {
      isolated
        .findOne('input')
        .props.onChange({ target: { value: 'Trillian' } })

      expect(isolated.findOne('input').props.value).to.eq('Trillian')
    })
  })

  describe('setState with a callback', () => {
    let invocations: string[]
    class NameComponent extends React.Component<{}, { name: string }> {
      state = {
        name: 'Arthur',
      }
      render() {
        invocations.push('render')
        return (
          <input
            type="text"
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              invocations.push('onChange')
              this.setState(
                (s) => ({ ...s, name: e.target.value }),
                () => {
                  invocations.push('setState callback')
                }
              )
            }}
            value={this.state.name}
          />
        )
      }
    }

    let isolated: IsolatedComponent<{ name: string }>

    beforeEach(() => {
      invocations = []
      isolated = isolateComponent(<NameComponent />)
    })

    it('can update state', () => {
      isolated
        .findOne('input')
        .props.onChange({ target: { value: 'Trillian' } })

      expect(invocations).to.eql([
        'render',
        'onChange',
        'render',
        'setState callback',
      ])
    })
  })

  describe('componentDidMount', () => {
    let invocations: string[]

    class DidMountExample extends React.Component<{}, { name: string }> {
      state = {
        name: 'Arthur',
      }

      componentDidMount() {
        invocations.push('componentDidMount')
        this.setState({ name: 'Zaphod' })
      }

      render() {
        invocations.push('render')
        return <div>{this.state.name}</div>
      }
    }

    let isolated: IsolatedComponent<{ name: string }>

    beforeEach(() => {
      invocations = []
      isolated = isolateComponent(<DidMountExample />)
    })

    it('is invoked after first render', () => {
      expect(invocations).to.eql(['render', 'componentDidMount', 'render'])
    })

    it('is synchronously re-rendered', () => {
      expect(isolated.toString()).to.eq('<div>Zaphod</div>')
    })
  })

  describe('componentWillUnmount', () => {
    let invocations: string[]

    class WillUnmountExample extends React.Component<{}, { name: string }> {
      componentWillUnmount() {
        invocations.push('componentWillUnmount')
      }

      render() {
        return <div />
      }
    }

    let isolated: IsolatedComponent<{ name: string }>

    beforeEach(() => {
      invocations = []
      isolated = isolateComponent(<WillUnmountExample />)
    })

    it('is not invoked until cleanup', () => {
      expect(invocations).to.eql([])
    })

    it('is invoked upon cleanup', () => {
      isolated.cleanup()
      expect(invocations).to.eql(['componentWillUnmount'])
    })
  })

  describe('componentDidUpdate', () => {
    let invocations: string[]

    class DidUpdateExample extends React.Component<{ name: string }> {
      componentDidUpdate(prevProps: { name: string }) {
        invocations.push(`componentDidUpdate:${prevProps.name}`)
      }

      render() {
        invocations.push(`render:${this.props.name}`)
        return <div />
      }
    }

    let isolated: IsolatedComponent<{ name: string }>

    beforeEach(() => {
      invocations = []
      isolated = isolateComponent(<DidUpdateExample name="Arthur" />)
    })

    it('is not invoked on first render', () => {
      expect(invocations).to.eql(['render:Arthur'])
    })

    it('is invoked upon re-render', () => {
      isolated.setProps({ name: 'Trillian' })
      expect(invocations).to.eql([
        'render:Arthur',
        'render:Trillian',
        'componentDidUpdate:Arthur',
      ])
    })
  })

  describe('getSnapshotBeforeUpdate', () => {
    let invocations: string[]
    beforeEach(() => {
      invocations = []
    })

    class SnapshotExample extends React.Component<{ name: string }> {
      getSnapshotBeforeUpdate(prevProps: { name: string }) {
        invocations.push(`getSnapshotBeforeUpdate:${prevProps.name}`)
        return prevProps.name
      }

      componentDidUpdate(prevProps: { name: string }, _: any, snapshot: any) {
        invocations.push(`componentDidUpdate:${prevProps.name}:${snapshot}`)
      }

      render() {
        invocations.push(`render:${this.props.name}`)
        return <div />
      }
    }

    it('is invoked upon re-render', () => {
      const isolated = isolateComponent(<SnapshotExample name="Arthur" />)

      isolated.setProps({ name: 'Trillian' })
      expect(invocations).to.eql([
        'render:Arthur',
        'getSnapshotBeforeUpdate:Arthur',
        'render:Trillian',
        'componentDidUpdate:Arthur:Arthur',
      ])
    })
  })

  describe('shouldComponentUpdate', () => {
    let invocations: string[]

    class ShouldUpdateExample extends React.Component<{ name: string }, {}> {
      shouldComponentUpdate(nextProps: { name: string }) {
        invocations.push('shouldComponentUpdate')
        return nextProps.name !== this.props.name
      }

      render() {
        invocations.push(`render:${this.props.name}`)
        return <div>{this.props.name}</div>
      }
    }

    let isolated: IsolatedComponent<{ name: string }>

    beforeEach(() => {
      invocations = []
      isolated = isolateComponent(<ShouldUpdateExample name="Arthur" />)
    })

    it('is not invoked on first render', () => {
      expect(invocations).to.eql(['render:Arthur'])
    })

    it('prevents render', () => {
      isolated.setProps({ name: 'Arthur' })
      expect(invocations).to.eql(['render:Arthur', 'shouldComponentUpdate'])
    })

    it('does not prevent render if true returned', () => {
      isolated.setProps({ name: 'Trillian' })
      expect(invocations).to.eql([
        'render:Arthur',
        'shouldComponentUpdate',
        'render:Trillian',
      ])
    })
  })
})
