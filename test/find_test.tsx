import { describe, it } from 'mocha'
import React from 'react'
import { isolateComponent } from '../src'
import { expect } from 'chai'

describe('finding child elements', () => {
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
      }).to.throw()
    })

    it('throws if multiple matches', () => {
      const component = isolateComponent(<MultipleDivs />)
      expect(() => {
        component.findOne('div')
      }).to.throw()
    })

    it('can find by component', () => {
      const component = isolateComponent(<JustAnFC />)
      const child = component.findOne(ExampleFC)
      expect(child.type).to.eq(ExampleFC)
      expect(child.props.name).to.eq('trillian')
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

  describe('querying by selector', () => {
    describe('find by id', () => {
      const component = isolateComponent(
        <ChildrenExample>
          <div id="example-id" className="example-class" />
        </ChildrenExample>
      )
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
