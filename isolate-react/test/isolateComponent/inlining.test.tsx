import { describe, it } from 'mocha'
import React, { useEffect, useMemo, useState } from 'react'
import {
  isolateComponent,
  isolateComponentTree,
} from '../../src/isolateComponent'
import assert from 'node:assert'

describe('inlining ', () => {
  const ListItem = (props: { children: React.ReactNode }) => (
    <li>{props.children}</li>
  )

  it('can inline a component', () => {
    const List = () => (
      <ul>
        <ListItem>list item content</ListItem>
      </ul>
    )

    const isolated = isolateComponent(<List />)
    isolated.inline(ListItem)

    assert.strictEqual(isolated.findOne('li').content(), 'list item content')
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

    assert.strictEqual(isolated.findOne('li').content(), 'B')
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

    assert.strictEqual(isolated.findAll('li').length, 2)
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
    assert.strictEqual(isolated.findOne('li').content(), 'foo')

    isolated.setProps({
      items: [
        ['2', 'baz'],
        ['1', 'bar'],
      ],
    })

    const lis = isolated.findAll('li')
    assert.strictEqual(lis.length, 2)
    assert.strictEqual(lis[0].content(), 'baz')
    assert.strictEqual(lis[1].content(), 'foobar')
  })

  describe('with a recursive hierarchy', () => {
    const Section = (props: {
      caption: string
      children?: React.ReactNode
    }) => (
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

      assert.strictEqual(isolated.findAll('section').length, 3)
    })

    it('supports content() and toString()', () => {
      const isolated = isolateComponent(<Sections />)

      isolated.inline(Section)
      const expected = `<section><h2>A</h2><section><h2>B</h2><section><h2>C</h2></section></section></section>`
      assert.strictEqual(isolated.content(), expected)
      assert.strictEqual(isolated.toString(), expected)
    })

    it('can inline all components with a star selector', () => {
      const isolated = isolateComponent(<Sections />)
      isolated.inline('*')
      assert.strictEqual(isolated.findAll('section').length, 3)
    })

    it('can inline components by name', () => {
      const isolated = isolateComponent(<Sections />)
      isolated.inline('Section')
      assert.strictEqual(isolated.findAll('section').length, 3)
    })
  })

  it('handles render child', () => {
    const RenderChild = ({ children }: { children: () => any }) => (
      <div>{children()}</div>
    )
    const isolated = isolateComponent(
      <RenderChild>{() => <div>Yo</div>}</RenderChild>
    )
    isolated.inline('*')

    assert.strictEqual(isolated.content(), '<div>Yo</div>')
    assert.strictEqual(isolated.toString(), '<div><div>Yo</div></div>')
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
    assert.strictEqual(isolated.findOne('button').props.className, 'toggled')
  })

  it('handles inlining with useMemo', () => {
    const Outer = ({ name }: { name: string }) => {
      const Memoed = useMemo(() => () => <span>Hello {name}</span>, [name])
      return <Memoed />
    }

    const isolated = isolateComponent(<Outer name="Arthur" />)
    isolated.inline('*')
    assert.strictEqual(isolated.toString(), '<span>Hello Arthur</span>')
  })

  describe('Inner component setting state in effect', () => {
    const SetNameUponMount = (props: {
      name: string
      setName: (name: string) => void
    }) => {
      useEffect(() => {
        props.setName('Arthur')
      }, [])
      return <div>{props.name}</div>
    }

    const Wrapper = () => {
      const [name, setName] = useState('')

      return (
        <>
          <SetNameUponMount setName={setName} name={name} />
        </>
      )
    }

    it('with isolateComponentTree', () => {
      const isolated = isolateComponentTree(<Wrapper />)
      assert.strictEqual(isolated.toString(), '<div>Arthur</div>')
    })

    it('inlined after render', () => {
      const isolated = isolateComponent(<Wrapper />)
      isolated.inline(SetNameUponMount)
      assert.strictEqual(isolated.toString(), '<div>Arthur</div>')
    })
  })
})
