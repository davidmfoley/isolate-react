import { isolateComponent } from 'isolate-react'
import React from 'react'
import { AddItem, ShoppingList, ShoppingListItem } from './ShoppingList'

describe('ShoppingList -- without inline', () => {
  test('starts empty', () => {
    const isolated = isolateComponent(<ShoppingList />)
    expect(isolated.exists(ShoppingListItem)).toEqual(false)
  })

  test('add a shopping list item', () => {
    const isolated = isolateComponent(<ShoppingList />)
    isolated.findOne(AddItem).props.onAddItem('Avocado')
    expect(isolated.findAll(ShoppingListItem).length).toEqual(1)
    expect(isolated.findOne(ShoppingListItem).props.item.description).toEqual(
      'Avocado'
    )
  })
})

describe('ShoppingList -- with inline', () => {
  test('add a shopping list item', () => {
    const isolated = isolateComponent(<ShoppingList />)

    // Using '*' will inline all components:
    // isolated.inline('*')
    isolated.inline(ShoppingListItem)
    isolated.inline(AddItem)

    isolated
      .findOne('input[name=description]')
      .props.onChange({ target: { value: 'Avocado' } })

    isolated.findOne('button.add-item').props.onClick()

    expect(isolated.findAll('li').length).toEqual(2)
    expect(isolated.findOne('span.item-description').content()).toEqual(
      'Avocado'
    )
  })
})
