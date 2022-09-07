import { describe, it } from 'mocha'
import React from 'react'
import { isolateComponent, IsolatedComponent } from '../../src/isolateComponent'
import assert from 'node:assert'

describe('IsolatedComponent queries', () => {
  const ExampleFC = ({ name }: { name: string }) => <span>{name}</span>
  const JustADiv = () => <div className="the-thing" />

  const MultipleDivs = () => (
    <div className="the-thing">
      <div />
      <div />
    </div>
  )
  const JustAnFC = () => <ExampleFC name="trillian" />
  const ChildrenExample = ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  )

  describe('exists', () => {
    it('returns true for a matching html element', () => {
      const component = isolateComponent(<JustADiv />)
      assert.strictEqual(component.exists('div'), true)
    })

    it('returns false for an element that does not exist', () => {
      const component = isolateComponent(<JustADiv />)
      assert.strictEqual(component.exists('span'), false)
    })

    it('returns true for a component that exists', () => {
      const Inner = () => <div></div>
      const Container = () => (
        <div>
          <Inner />
        </div>
      )
      const component = isolateComponent(<Container />)
      assert.strictEqual(component.exists(Inner), true)
    })

    it('returns false for a component that does not exist', () => {
      const Foo = () => <div></div>
      const Bar = () => <div></div>
      const component = isolateComponent(<Foo />)
      assert.strictEqual(component.exists(Bar), false)
    })
  })

  describe('findOne', () => {
    it('can find by tag', () => {
      const component = isolateComponent(<JustADiv />)
      const child = component.findOne('div')
      assert.strictEqual(child.type, 'div')
      assert.strictEqual(child.props.className, 'the-thing')
    })

    it('throws if no match', () => {
      const component = isolateComponent(<JustADiv />)
      assert.throws(() => {
        component.findOne('p')
      }, 'Could not find element matching p')
    })

    it('throws if multiple matches', () => {
      const component = isolateComponent(<MultipleDivs />)
      assert.throws(
        () => {
          component.findOne('div')
        },
        {
          message:
            'Expected one element matching div but found 3 elements in <div className="the-thing"><div /><div /></div>',
        }
      )
    })

    it('can find by component', () => {
      const component = isolateComponent(<JustAnFC />)
      const child = component.findOne(ExampleFC)
      assert.strictEqual(child.type, ExampleFC)
      assert.strictEqual(child.props.name, 'trillian')
    })

    it('throws a reasonable error if component not found', () => {
      const component = isolateComponent(<MultipleDivs />)
      assert.throws(() => {
        component.findOne(ExampleFC)
      }, 'Could not find element matching ExampleFC in <div')
    })

    it('can find component by name', () => {
      const component = isolateComponent(<JustAnFC />)
      const child = component.findOne('ExampleFC')
      assert.strictEqual(child.type, ExampleFC)
      assert.strictEqual(child.props.name, 'trillian')
    })

    it('can find a deeper component', () => {
      const component = isolateComponent(
        <ChildrenExample>
          <JustAnFC />
        </ChildrenExample>
      )
      const child = component.findOne(JustAnFC)
      assert.strictEqual(child.type, JustAnFC)
    })
  })

  describe('querying for class components', () => {
    class ExampleClassComponent extends React.Component<{}> {
      render() {
        return <div>Hello</div>
      }
    }
    it('supports finding class components', () => {
      const FunctionThatRendersClass = () => (
        <div>
          <ExampleClassComponent />
        </div>
      )

      const isolated = isolateComponent(<FunctionThatRendersClass />)
      assert.strictEqual(isolated.exists(ExampleClassComponent), true)
      assert.strictEqual(isolated.findAll(ExampleClassComponent).length, 1)
    })
  })
  describe('querying by selector', () => {
    describe('find by id', () => {
      let component: IsolatedComponent<{}>

      beforeEach(() => {
        component = isolateComponent(
          <ChildrenExample>
            <div id="example-id" className="example-class" />
          </ChildrenExample>
        )
      })

      it('can find by id only', () => {
        const div = component.findOne('#example-id')
        assert.strictEqual(div.props.className, 'example-class')
      })

      it('can find by id and tag name', () => {
        const div = component.findOne('div#example-id')
        assert.strictEqual(div.props.className, 'example-class')
      })
      it('does not match with different tag', () => {
        assert.deepEqual(component.findAll('div#bogus-id'), [])
      })

      it('does not match with different id', () => {
        assert.deepEqual(component.findAll('span#example-id'), [])
      })
    })
  })

  describe('findAll', () => {
    it('returns empty array if no matches', () => {
      const component = isolateComponent(<JustADiv />)
      assert.deepEqual(component.findAll('tr'), [])
    })

    it('returns matching element by tag', () => {
      const component = isolateComponent(<JustADiv />)
      assert.strictEqual(component.findAll('div').length, 1)
    })

    it('can find by component', () => {
      const component = isolateComponent(<JustAnFC />)
      const matches = component.findAll(ExampleFC)
      assert.strictEqual(matches.length, 1)
      assert.strictEqual(matches[0].props.name, 'trillian')
    })
  })
})
