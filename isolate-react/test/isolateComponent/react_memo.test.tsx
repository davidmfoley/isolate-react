import { describe, it } from 'mocha'
import React from 'react'
import { expect } from 'chai'
import { isolateComponent } from '../../src/isolateComponent'

describe('Inlining with react.memo', () => {
  let renderedNames: string[] = []

  beforeEach(() => {
    renderedNames = []
  })

  describe('with default comparer', () => {
    const Memoed = React.memo(({ name }: { name: string }) => {
      renderedNames.push(name)
      return <span>Hello {name}</span>
    })

    const DefaultMemo = ({ name }: { name: string }) => {
      return <Memoed name={name} />
    }
    it('renders', () => {
      const isolated = isolateComponent(<DefaultMemo name="Arthur" />)
      isolated.inline('*')
      expect(isolated.toString()).to.eq('<span>Hello Arthur</span>')
      expect(renderedNames).to.eql(['Arthur'])
    })

    it('updates upon change', () => {
      const isolated = isolateComponent(<DefaultMemo name="Arthur" />)
      isolated.inline('*')
      isolated.setProps({ name: 'Trillian' })
      expect(isolated.toString()).to.eq('<span>Hello Trillian</span>')
    })

    it('does not rerender with no change', () => {
      const isolated = isolateComponent(<DefaultMemo name="Arthur" />)
      isolated.inline('*')
      isolated.setProps({ name: 'Arthur' })
      expect(isolated.toString()).to.eq('<span>Hello Arthur</span>')
      expect(renderedNames).to.eql(['Arthur'])
    })
  })

  describe('with custom comparer', () => {
    const MemoedCaseInsensitive = React.memo(
      ({ name }: { name: string }) => {
        renderedNames.push(name)
        return <span>HELLO {name.toUpperCase()}</span>
      },
      (prev, next) => prev.name.toUpperCase() === next.name.toUpperCase()
    )

    const CaseInsensitiveMemo = ({ name }: { name: string }) => {
      return <MemoedCaseInsensitive name={name} />
    }

    it('renders', () => {
      const isolated = isolateComponent(<CaseInsensitiveMemo name="Arthur" />)
      isolated.inline('*')
      expect(isolated.toString()).to.eq('<span>HELLO ARTHUR</span>')
      expect(renderedNames).to.eql(['Arthur'])
    })

    it('updates upon change', () => {
      const isolated = isolateComponent(<CaseInsensitiveMemo name="Arthur" />)
      isolated.inline('*')
      isolated.setProps({ name: 'Trillian' })
      expect(isolated.toString()).to.eq('<span>HELLO TRILLIAN</span>')
    })

    it('does not rerender with no change', () => {
      const isolated = isolateComponent(<CaseInsensitiveMemo name="Arthur" />)
      isolated.inline('*')
      isolated.setProps({ name: 'Arthur' })
      isolated.setProps({ name: 'ARTHUR' })
      expect(isolated.toString()).to.eq('<span>HELLO ARTHUR</span>')
      expect(renderedNames).to.eql(['Arthur'])
    })
  })
})
