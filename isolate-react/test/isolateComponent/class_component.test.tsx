import { describe, it } from 'mocha'
import React, { ChangeEvent } from 'react'
import { isolateComponent } from '../../src/isolateComponent'
import assert from 'node:assert/strict'

describe('React class components', () => {
  describe('component with props only', () => {
    class PropsOnlyComponent extends React.Component<{ name: string }> {
      render() {
        return <div>Hello {this.props.name}</div>
      }
    }

    it('can render', () => {
      const isolated = isolateComponent(<PropsOnlyComponent name="Trillian" />)
      assert.strictEqual(isolated.toString(), '<div>Hello Trillian</div>')
    })

    it('can update props', () => {
      const isolated = isolateComponent(<PropsOnlyComponent name="Trillian" />)
      isolated.mergeProps({ name: 'Ford' })
      assert.strictEqual(isolated.toString(), '<div>Hello Ford</div>')
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

    it('populates state', () => {
      const isolated = isolateComponent(<NameComponent />)
      assert.strictEqual(isolated.findOne('input').props.value, 'Arthur')
    })

    it('can update state', () => {
      const isolated = isolateComponent(<NameComponent />)
      isolated
        .findOne('input')
        .props.onChange({ target: { value: 'Trillian' } })
      assert.strictEqual(isolated.findOne('input').props.value, 'Trillian')
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

    it('populates state', () => {
      const isolated = isolateComponent(<NameComponent />)
      assert.strictEqual(isolated.findOne('input').props.value, 'Arthur')
    })

    it('can update state', () => {
      const isolated = isolateComponent(<NameComponent />)
      isolated
        .findOne('input')
        .props.onChange({ target: { value: 'Trillian' } })

      assert.strictEqual(isolated.findOne('input').props.value, 'Trillian')
    })
  })

  describe('setState with a callback', () => {
    class NameComponent extends React.Component<
      { invocations: string[] },
      { name: string }
    > {
      state = {
        name: 'Arthur',
      }
      render() {
        this.props.invocations.push('render')
        return (
          <input
            type="text"
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              this.props.invocations.push('onChange')
              this.setState(
                (s) => ({ ...s, name: e.target.value }),
                () => {
                  this.props.invocations.push('setState callback')
                }
              )
            }}
            value={this.state.name}
          />
        )
      }
    }

    it('can update state', () => {
      const invocations: string[] = []
      const isolated = isolateComponent(
        <NameComponent invocations={invocations} />
      )

      isolated
        .findOne('input')
        .props.onChange({ target: { value: 'Trillian' } })

      assert.deepEqual(invocations, [
        'render',
        'onChange',
        'render',
        'setState callback',
      ])
    })
  })

  describe('componentDidMount', () => {
    class DidMountExample extends React.Component<
      {
        invocations: string[]
      },
      { name: string }
    > {
      state = {
        name: 'Arthur',
      }

      componentDidMount() {
        this.props.invocations.push('componentDidMount')
        this.setState({ name: 'Zaphod' })
      }

      render() {
        this.props.invocations.push('render')
        return <div>{this.state.name}</div>
      }
    }

    it('is invoked after first render', () => {
      const invocations = [] as string[]
      isolateComponent(<DidMountExample invocations={invocations} />)
      assert.deepEqual(invocations, ['render', 'componentDidMount', 'render'])
    })

    it('is synchronously re-rendered', () => {
      const invocations = [] as string[]
      const isolated = isolateComponent(
        <DidMountExample invocations={invocations} />
      )
      assert.strictEqual(isolated.toString(), '<div>Zaphod</div>')
    })
  })

  describe('componentWillUnmount', () => {
    class WillUnmountExample extends React.Component<
      {
        invocations: string[]
      },
      { name: string }
    > {
      componentWillUnmount() {
        this.props.invocations.push('componentWillUnmount')
      }

      render() {
        return <div />
      }
    }

    it('is not invoked until cleanup', () => {
      const invocations = [] as string[]
      isolateComponent(<WillUnmountExample invocations={invocations} />)
      assert.deepStrictEqual(invocations, [])
    })

    it('is invoked upon cleanup', () => {
      const invocations = [] as string[]
      const isolated = isolateComponent(
        <WillUnmountExample invocations={invocations} />
      )
      isolated.cleanup()
      assert.deepEqual(invocations, ['componentWillUnmount'])
    })
  })

  describe('componentDidUpdate', () => {
    class DidUpdateExample extends React.Component<{
      name: string
      invocations: string[]
    }> {
      componentDidUpdate(prevProps: { name: string }) {
        this.props.invocations.push(`componentDidUpdate:${prevProps.name}`)
      }

      render() {
        this.props.invocations.push(`render:${this.props.name}`)
        return <div />
      }
    }

    it('is not invoked on first render', () => {
      const invocations = []
      isolateComponent(
        <DidUpdateExample name="Arthur" invocations={invocations} />
      )
      assert.deepEqual(invocations, ['render:Arthur'])
    })

    it('is invoked upon re-render', () => {
      const invocations = []
      const isolated = isolateComponent(
        <DidUpdateExample name="Arthur" invocations={invocations} />
      )
      isolated.mergeProps({ name: 'Trillian' })
      assert.deepEqual(invocations, [
        'render:Arthur',
        'render:Trillian',
        'componentDidUpdate:Arthur',
      ])
    })
  })

  describe('getSnapshotBeforeUpdate', () => {
    class SnapshotExample extends React.Component<{
      name: string
      invocations: string[]
    }> {
      getSnapshotBeforeUpdate(prevProps: { name: string }) {
        this.props.invocations.push(`getSnapshotBeforeUpdate:${prevProps.name}`)
        return prevProps.name
      }

      componentDidUpdate(prevProps: { name: string }, _: any, snapshot: any) {
        this.props.invocations.push(
          `componentDidUpdate:${prevProps.name}:${snapshot}`
        )
      }

      render() {
        this.props.invocations.push(`render:${this.props.name}`)
        return <div />
      }
    }

    it('is invoked upon re-render', () => {
      const invocations: string[] = []

      const isolated = isolateComponent(
        <SnapshotExample name="Arthur" invocations={invocations} />
      )

      isolated.mergeProps({ name: 'Trillian' })

      assert.deepEqual(invocations, [
        'render:Arthur',
        'getSnapshotBeforeUpdate:Arthur',
        'render:Trillian',
        'componentDidUpdate:Arthur:Arthur',
      ])
    })
  })

  describe('shouldComponentUpdate', () => {
    class ShouldUpdateExample extends React.Component<{
      name: string
      invocations: string[]
    }> {
      shouldComponentUpdate(nextProps: { name: string }) {
        this.props.invocations.push('shouldComponentUpdate')
        return nextProps.name !== this.props.name
      }

      render() {
        this.props.invocations.push(`render:${this.props.name}`)
        return <div>{this.props.name}</div>
      }
    }

    it('is not invoked on first render', () => {
      const invocations: string[] = []
      isolateComponent(
        <ShouldUpdateExample name="Arthur" invocations={invocations} />
      )
      assert.deepEqual(invocations, ['render:Arthur'])
    })

    it('prevents render', () => {
      const invocations: string[] = []
      const isolated = isolateComponent(
        <ShouldUpdateExample name="Arthur" invocations={invocations} />
      )
      isolated.mergeProps({ name: 'Arthur' })
      assert.deepEqual(invocations, ['render:Arthur', 'shouldComponentUpdate'])
    })

    it('does not prevent render if true returned', () => {
      const invocations: string[] = []
      const isolated = isolateComponent(
        <ShouldUpdateExample name="Arthur" invocations={invocations} />
      )
      isolated.mergeProps({ name: 'Trillian' })
      assert.deepEqual(invocations, [
        'render:Arthur',
        'shouldComponentUpdate',
        'render:Trillian',
      ])
    })
  })

  describe('counter button example', () => {
    class CounterButton extends React.Component<{}, { count: number }> {
      state = { count: 0 }

      render() {
        return (
          <button
            onClick={() => {
              this.setState(({ count }) => ({ count: count + 1 }))
            }}
          >
            {this.state.count}
          </button>
        )
      }
    }

    it(' renders', () => {
      const isolated = isolateComponent(<CounterButton />)
      assert.equal(isolated.content(), '0')
    })

    it('increments upon click', () => {
      const isolated = isolateComponent(<CounterButton />)

      isolated.findOne('button').props.onClick()

      assert.equal(isolated.content(), '1')
    })
  })
})
