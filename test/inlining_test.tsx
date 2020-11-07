import { describe, it } from 'mocha'
import React, { useEffect } from 'react'
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
})
