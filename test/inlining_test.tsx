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
})
