import React, { useState } from 'react'

interface Item {
  id: number
  description: string
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

export const ShoppingList = () => {
  const [items, setItems] = useState<Item[]>([])
  const [nextId, setNextId] = useState(1)

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
