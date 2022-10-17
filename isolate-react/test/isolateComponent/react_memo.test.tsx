import { describe, test } from 'mocha'
import React from 'react'
import assert from 'node:assert'
import { isolateComponent } from '../../src/isolateComponent'

describe('Inlining with react.memo', () => {
  let renderedNames: string[] = []

  beforeEach(() => {
    renderedNames = []
  })

  test('anonymous memo-ed component', () => {
    const MemoInPlace = React.memo(() => <div />)
    const isolated = isolateComponent(<MemoInPlace />)
    assert.strictEqual(isolated.toString(), '<div />')

    isolated.inline('*')
    assert.strictEqual(isolated.toString(), '<div />')
  })

  it('memoed forwardRef', () => {
    const InnerButton = () => <button />
    const RefButton = React.forwardRef(InnerButton)
    const Memoed = React.memo(RefButton)
    const isolated = isolateComponent(<Memoed />)
    isolated.findOne('button')
  })

  describe('with default comparer', () => {
    const Memoed = React.memo(({ name }: { name: string }) => {
      renderedNames.push(name)
      return <span>Hello {name}</span>
    })

    const DefaultMemo = ({ name }: { name: string }) => {
      return <Memoed name={name} />
    }

    test('render', () => {
      const isolated = isolateComponent(<DefaultMemo name="Arthur" />)
      isolated.inline('*')
      assert.strictEqual(isolated.toString(), '<span>Hello Arthur</span>')
      assert.deepEqual(renderedNames, ['Arthur'])
    })

    test('updates upon change', () => {
      const isolated = isolateComponent(<DefaultMemo name="Arthur" />)
      isolated.inline('*')
      isolated.setProps({ name: 'Trillian' })
      assert.strictEqual(isolated.toString(), '<span>Hello Trillian</span>')
    })

    test('does not rerender with no change', () => {
      const isolated = isolateComponent(<DefaultMemo name="Arthur" />)
      isolated.inline('*')
      isolated.setProps({ name: 'Arthur' })
      assert.strictEqual(isolated.toString(), '<span>Hello Arthur</span>')
      assert.deepEqual(renderedNames, ['Arthur'])
    })
  })

  describe('custom memo comparer', () => {
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

    test('renders', () => {
      const isolated = isolateComponent(<CaseInsensitiveMemo name="Arthur" />)
      isolated.inline('*')
      assert.strictEqual(isolated.toString(), '<span>HELLO ARTHUR</span>')
      assert.deepEqual(renderedNames, ['Arthur'])
    })

    test('updates upon change', () => {
      const isolated = isolateComponent(<CaseInsensitiveMemo name="Arthur" />)
      isolated.inline('*')
      isolated.setProps({ name: 'Trillian' })
      assert.strictEqual(isolated.toString(), '<span>HELLO TRILLIAN</span>')
    })

    test('does not rerender with no change', () => {
      const isolated = isolateComponent(<CaseInsensitiveMemo name="Arthur" />)
      isolated.inline('*')
      isolated.setProps({ name: 'Arthur' })
      isolated.setProps({ name: 'ARTHUR' })
      assert.strictEqual(isolated.toString(), '<span>HELLO ARTHUR</span>')
      assert.deepEqual(renderedNames, ['Arthur'])
    })
  })
})
