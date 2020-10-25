import { describe, it } from 'mocha'
import React from 'react'
import { isolateComponent, IsolatedComponent } from '../src'
import { expect } from 'chai'

describe('React class components', () => {
  describe('conmponent with props only', () => {
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
})
