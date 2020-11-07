import { describe, it } from 'mocha'
import React from 'react'
import { expect } from 'chai'
import { isolateComponent } from '../src'

describe('inlining ', () => {
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
    const ListItem: React.FC<{}> = (props) => <li>{props.children}</li>
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
    const ListItem: React.FC<{}> = (props) => <li>{props.children}</li>
    const List = ({ items }: { items: [string, string][] }) => (
      <ul>
        {items.map(([k, v]) => (
          <ListItem key={k}>{v}</ListItem>
        ))}
      </ul>
    )

    const isolated = isolateComponent(<List items={[['a', '1']]} />)

    isolated.inline(ListItem)

    isolated.setProps({
      items: [
        ['b', '2'],
        ['a', '3'],
      ],
    })

    expect(isolated.findAll('li').length).to.eq(2)
  })
})
