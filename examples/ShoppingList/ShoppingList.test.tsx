import { isolateComponent, isolateComponentTree } from 'isolate-react'
import React from 'react'
import { AddItem, ShoppingList, ShoppingListItem } from './ShoppingList'

describe('ShoppingList -- with isolateComponent', () => {
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

describe('ShoppingList -- with isolateComponentTree', () => {
  test('add a shopping list item', () => {
    const component = isolateComponentTree(<ShoppingList />)

    component
      .findOne('input[name=description]')
      .props.onChange({ target: { value: 'Avocado' } })

    component.findOne('button.add-item').props.onClick()

    expect(component.findAll('li').length).toEqual(2)
    expect(component.findOne('span.item-description').content()).toEqual(
      'Avocado'
    )
  })
})
