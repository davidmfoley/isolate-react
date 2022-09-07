import { describe, it } from 'mocha'
import React from 'react'
import assert from 'node:assert'
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
      assert.strictEqual(isolated.toString(), '<span>Hello Arthur</span>')
      assert.deepEqual(renderedNames, ['Arthur'])
    })

    it('updates upon change', () => {
      const isolated = isolateComponent(<DefaultMemo name="Arthur" />)
      isolated.inline('*')
      isolated.setProps({ name: 'Trillian' })
      assert.strictEqual(isolated.toString(), '<span>Hello Trillian</span>')
    })

    it('does not rerender with no change', () => {
      const isolated = isolateComponent(<DefaultMemo name="Arthur" />)
      isolated.inline('*')
      isolated.setProps({ name: 'Arthur' })
      assert.strictEqual(isolated.toString(), '<span>Hello Arthur</span>')
      assert.deepEqual(renderedNames, ['Arthur'])
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
      assert.strictEqual(isolated.toString(), '<span>HELLO ARTHUR</span>')
      assert.deepEqual(renderedNames, ['Arthur'])
    })

    it('updates upon change', () => {
      const isolated = isolateComponent(<CaseInsensitiveMemo name="Arthur" />)
      isolated.inline('*')
      isolated.setProps({ name: 'Trillian' })
      assert.strictEqual(isolated.toString(), '<span>HELLO TRILLIAN</span>')
    })

    it('does not rerender with no change', () => {
      const isolated = isolateComponent(<CaseInsensitiveMemo name="Arthur" />)
      isolated.inline('*')
      isolated.setProps({ name: 'Arthur' })
      isolated.setProps({ name: 'ARTHUR' })
      assert.strictEqual(isolated.toString(), '<span>HELLO ARTHUR</span>')
      assert.deepEqual(renderedNames, ['Arthur'])
    })
  })
})
