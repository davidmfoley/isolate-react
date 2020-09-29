import { useState } from 'react'

type TodoId = number

interface Todo {
  id: TodoId
  title: string
  state: 'todo' | 'doing' | 'done'
}

export interface TodoState {
  todos: Todo[]
  addTodo: (title: string) => void
  deleteTodo: (id: TodoId) => void
  startTodo: (id: TodoId) => void
  finishTodo: (id: TodoId) => void
  updateTodoTitle: (id: TodoId, title: string) => void
}

let count = 0
const nextId = () => count++

export const useTodos = (): TodoState => {
  const [todos, setTodos] = useState([])

  const updateById = (id: TodoId, updater: (t: Todo) => Todo) =>
    setTodos(todos.map((t) => (t.id === id ? updater(t) : t)))

  return {
    todos,

    addTodo: (title: string) =>
      setTodos([...todos, { id: nextId(), title, state: 'todo' }]),

    deleteTodo: (id: TodoId) => setTodos(todos.filter((t) => t.id !== id)),

    updateTodoTitle: (id: TodoId, title: string) =>
      updateById(id, (t) => ({ ...t, title })),

    startTodo: (id: TodoId) =>
      updateById(id, (t) => ({ ...t, state: 'doing' })),

    finishTodo: (id: TodoId) =>
      updateById(id, (t) => ({ ...t, state: 'done' })),
  }
}
