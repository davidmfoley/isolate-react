import { describe, it } from 'mocha'
import React from 'react'
import { isolateComponent } from '../src'
import { expect } from 'chai'

describe('isolateComponents ', () => {
  describe('finding child elements', () => {
    const ExampleFC = ({ name }: { name: string }) => <span>{name}</span>
    const JustADiv = () => <div className="the-thing" />
    const JustAnFC = () => <ExampleFC name="trillian" />

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

      it('can find by component', () => {
        const component = isolateComponent(<JustAnFC />)
        const child = component.findOne(ExampleFC)
        expect(child.type).to.eq(ExampleFC)
        expect(child.props.name).to.eq('trillian')
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

    describe('setProps', () => {
      it('updates and re-renders', () => {
        const component = isolateComponent(<ExampleFC name="arthur" />)
        expect(component.findOne('span').props.children).to.eq('arthur')

        component.mergeProps({ name: 'trillian' })
        expect(component.findOne('span').props.children).to.eq('trillian')
      })
    })
  })
})
