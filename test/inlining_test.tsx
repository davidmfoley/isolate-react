import { describe, it } from 'mocha'
import React, { useEffect, useMemo } from 'react'
import { expect } from 'chai'
import { isolateComponent } from '../src'

describe('inlining ', () => {
  const ListItem: React.FC<{}> = (props) => <li>{props.children}</li>

  it('can inline a component', () => {
    const ListItem: React.FC<{}> = (props) => <li>{props.children}</li>
    const List = () => (
      <ul>
        <ListItem>list item content</ListItem>
      </ul>
    )

    const isolated = isolateComponent(<List />)
    isolated.inline(ListItem)

    expect(isolated.findOne('li').content()).to.eq('list item content')
  })

  it('can update an inlined component', () => {
    const List = ({ itemCaption }: any) => (
      <ul>
        <ListItem>{itemCaption}</ListItem>
      </ul>
    )

    const isolated = isolateComponent(<List itemCaption="A" />)
    isolated.inline(ListItem)
    isolated.setProps({ itemCaption: 'B' })

    expect(isolated.findOne('li').content()).to.eq('B')
  })

  it('isolates newly matching components', () => {
    const Strings = (props: { items: string[] }) => (
      <ul>
        {props.items.map((v) => (
          <ListItem key={v}>{v}</ListItem>
        ))}
      </ul>
    )

    const isolated = isolateComponent(<Strings items={['a']} />)

    isolated.inline(ListItem)

    isolated.setProps({
      items: ['b', 'a'],
    })

    expect(isolated.findAll('li').length).to.eq(2)
  })

  it('supports keys', () => {
    const Appender = (props: { value: string }) => {
      const [appended, setAppended] = React.useState('')

      useEffect(() => {
        setAppended(appended + props.value)
      }, [props.value])

      return <li>{appended}</li>
    }

    const KeyedStrings = ({ items }: { items: [string, string][] }) => (
      <ul>
        {items.map(([k, v]) => (
          <Appender key={k} value={v} />
        ))}
      </ul>
    )

    const isolated = isolateComponent(<KeyedStrings items={[['1', 'foo']]} />)

    isolated.inline(Appender)
    expect(isolated.findOne('li').content()).to.eq('foo')

    isolated.setProps({
      items: [
        ['2', 'baz'],
        ['1', 'bar'],
      ],
    })

    const lis = isolated.findAll('li')
    expect(lis.length).to.eq(2)
    expect(lis[0].content()).to.eq('baz')
    expect(lis[1].content()).to.eq('foobar')
  })

  describe('with a recursive hierarchy', () => {
    const Section: React.FC<{ caption: string }> = (props) => (
      <section>
        <h2>{props.caption}</h2>
        {props.children}
      </section>
    )

    const Sections = () => (
      <Section caption="A">
        <Section caption="B">
          <Section caption="C"></Section>
        </Section>
      </Section>
    )

    it('recursively inlines', () => {
      const isolated = isolateComponent(<Sections />)

      isolated.inline(Section)

      expect(isolated.findAll('section').length).to.eq(3)
    })

    it('supports content() and toString()', () => {
      const isolated = isolateComponent(<Sections />)

      isolated.inline(Section)
      const expected = `<section><h2>A</h2><section><h2>B</h2><section><h2>C</h2></section></section></section>`
      expect(isolated.content()).to.eq(expected)
      expect(isolated.toString()).to.eq(expected)
    })

    it('can inline all components with a star selector', () => {
      const isolated = isolateComponent(<Sections />)
      isolated.inline('*')
      expect(isolated.findAll('section').length).to.eq(3)
    })

    it('can inline components by name', () => {
      const isolated = isolateComponent(<Sections />)
      isolated.inline('Section')
      expect(isolated.findAll('section').length).to.eq(3)
    })
  })

  it('can handle state updates in inlined components', () => {
    const ToggleButton = (props: { text: string }) => {
      const [toggled, setToggled] = React.useState(false)

      return (
        <button
          className={toggled ? 'toggled' : 'not-toggled'}
          onClick={() => setToggled(!toggled)}
        >
          {props.text}
        </button>
      )
    }

    const Settings = () => (
      <div>
        <ToggleButton text="Turbo Mode" />
      </div>
    )

    const isolated = isolateComponent(<Settings />)
    isolated.inline(ToggleButton)
    isolated.findOne('button').props.onClick()
    expect(isolated.findOne('button').props.className).to.eq('toggled')
  })

  it('handles inlining with useMemo', () => {
    const Outer = ({ name }: { name: string }) => {
      const Memoed = useMemo(() => () => <span>Hello {name}</span>, [name])
      return <Memoed />
    }

    const isolated = isolateComponent(<Outer name="Arthur" />)
    isolated.inline('*')
    expect(isolated.toString()).to.eq('<span>Hello Arthur</span>')
  })
})
