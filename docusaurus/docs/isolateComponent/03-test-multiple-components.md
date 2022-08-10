---
title: Test multiple components
---

Sometimes we want to test a component by rendering its entire component tree. You may be familiar with this technique from using enzyme's `mount` functionality or `react-testing-library`.

We can use `isolateComponentTree` for this.


Let's take an example of a shopping list component that allows adding and removing items from a list:

```typescript
export const ShoppingList = () => {
  // items in the shopping list
  const [items, setItems] = useState<Item[]>([])

  // the id of the next item, used when adding an item to the list
  const [nextId, setNextId] = useState(1)

  // Render a <ShoppingListItem /> for each item in the list,
  // And <AddItem /> at the end to allow adding an item
  return (
    <ul>
      {items.map((item) => (
        <ShoppingListItem
          item={item}
          key={item.id}
          onDeleteItem={() => {
            setItems(items.filter((i) => i.id !== item.id))
          }}
        />
      ))}
      <AddItem
        onAddItem={(description) => {
          const id = nextId
          setNextId((nextId) => nextId + 1)
          setItems([...items, { description, id }])
        }}
      />
    </ul>
  )
}

export const ShoppingListItem = (props: {
  item: Item
  onDeleteItem: () => void
}) => (
  <li>
    <span className="item-description">{props.item.description}</span>
    <button className="delete-item" type="button" onClick={props.onDeleteItem}>
      Delete
    </button>
  </li>
)

export const AddItem = (props: {
  onAddItem: (description: string) => void
}) => {
  const [description, setDescription] = useState('')
  return (
    <li>
      <label>
        Description
        <input
          type="text"
          value={description}
          name="description"
          onChange={(e) => setDescription(e.target.value)}
        />
      </label>
      <button
        type="button"
        className="add-item"
        onClick={() => {
          props.onAddItem(description)
          setDescription('')
        }}
      >
        Add Item
      </button>
    </li>
  )
}
```

We can use `isolateComponentTree` to test all of these components together:


```javascript
  test('add a shopping list item', () => {
    const isolated = isolateComponentTree(<ShoppingList />)

    isolated
      // find the input element by name
      .findOne('input[name=description]')
      // simulate a change event
      .props.onChange({ target: { value: 'Avocado' } })

    // find the Add button by class name
    isolated.findOne('button.add-item').props.onClick()

    // We should have two lis: shopping list item and "add item"
    expect(isolated.findAll('li').length).toEqual(2)

    // assert that the description matches the input
    expect(isolated.findOne('span.item-description').content()).toEqual(
      'Avocado'
    )
  })
```

The choice between testing components individually or together has different tradeoffs depending on the components being tested. 

In general, testing components together gives confidence in the way the components integrate with each other, at the cost of increased [coupling](https://en.wikipedia.org/wiki/Coupling_(computer_programming)) between tests and implementations.


