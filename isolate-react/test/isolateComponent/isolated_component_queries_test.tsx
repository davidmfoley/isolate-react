import { describe, it } from 'mocha'
import React from 'react'
import { isolateComponent, IsolatedComponent } from '../../src/isolateComponent'
import { expect } from 'chai'

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
  const ChildrenExample: React.FC<{}> = ({ children }) => <div>{children}</div>

  describe('exists', () => {
    it('returns true for a matching html element', () => {
      const component = isolateComponent(<JustADiv />)
      expect(component.exists('div')).to.eq(true)
    })

    it('returns false for an element that does not exist', () => {
      const component = isolateComponent(<JustADiv />)
      expect(component.exists('span')).to.eq(false)
    })

    it('returns true for a component that exists', () => {
      const Inner = () => <div></div>
      const Container = () => (
        <div>
          <Inner />
        </div>
      )
      const component = isolateComponent(<Container />)
      expect(component.exists(Inner)).to.eq(true)
    })

    it('returns false for a component that does not exist', () => {
      const Foo = () => <div></div>
      const Bar = () => <div></div>
      const component = isolateComponent(<Foo />)
      expect(component.exists(Bar)).to.eq(false)
    })
  })

  describe('findOne', () => {
    it('can find by tag', () => {
      const component = isolateComponent(<JustADiv />)
      const child = component.findOne('div')
      expect(child.type).to.eq('div')
      expect(child.props.className).to.eq('the-thing')
    })

    it('throws if no match', () => {
      const component = isolateComponent(<JustADiv />)
      expect(() => {
        component.findOne('p')
      }).to.throw('Could not find element matching p')
    })

    it('throws if multiple matches', () => {
      const component = isolateComponent(<MultipleDivs />)
      expect(() => {
        component.findOne('div')
      }).to.throw(
        'Expected one element matching div but found 3 elements in <div className="the-thing"><div /><div /></div>'
      )
    })

    it('can find by component', () => {
      const component = isolateComponent(<JustAnFC />)
      const child = component.findOne(ExampleFC)
      expect(child.type).to.eq(ExampleFC)
      expect(child.props.name).to.eq('trillian')
    })

    it('throws a reasonable error if component not found', () => {
      const component = isolateComponent(<MultipleDivs />)
      expect(() => {
        component.findOne(ExampleFC)
      }).to.throw('Could not find element matching ExampleFC in <div')
    })

    it('can find component by name', () => {
      const component = isolateComponent(<JustAnFC />)
      const child = component.findOne('ExampleFC')
      expect(child.type).to.eq(ExampleFC)
      expect(child.props.name).to.eq('trillian')
    })

    it('can find a deeper component', () => {
      const component = isolateComponent(
        <ChildrenExample>
          <JustAnFC />
        </ChildrenExample>
      )
      const child = component.findOne(JustAnFC)
      expect(child.type).to.eq(JustAnFC)
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
      expect(isolated.exists(ExampleClassComponent)).to.eq(true)
      expect(isolated.findAll(ExampleClassComponent).length).to.eq(1)
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
        expect(div.props.className).to.eq('example-class')
      })

      it('can find by id and tag name', () => {
        const div = component.findOne('div#example-id')
        expect(div.props.className).to.eq('example-class')
      })
      it('does not match with different tag', () => {
        expect(component.findAll('div#bogus-id')).to.eql([])
      })

      it('does not match with different id', () => {
        expect(component.findAll('span#example-id')).to.eql([])
      })
    })
  })

  describe('findAll', () => {
    it('returns empty array if no matches', () => {
      const component = isolateComponent(<JustADiv />)
      expect(component.findAll('tr')).to.eql([])
    })

    it('returns matching element by tag', () => {
      const component = isolateComponent(<JustADiv />)
      expect(component.findAll('div').length).to.eql(1)
    })

    it('can find by component', () => {
      const component = isolateComponent(<JustAnFC />)
      const matches = component.findAll(ExampleFC)
      expect(matches.length).to.eq(1)
      expect(matches[0].props.name).to.eq('trillian')
    })
  })
})
