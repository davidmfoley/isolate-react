import { useTodos } from './useTodos'
import { isolateHook, IsolatedHook } from 'isolate-react'

describe('useTodos', () => {
  let useTestTodos: IsolatedHook<typeof useTodos>

  beforeEach(() => {
    useTestTodos = isolateHook(useTodos)
  })

  it('initially has no todos', () => {
    expect(useTestTodos().todos).toEqual([])
  })

  it('can add a todo', () => {
    useTestTodos().addTodo('Escape planet earth')

    const { todos } = useTestTodos()

    expect(todos.length).toEqual(1)
    expect(todos[0].title).toEqual('Escape planet earth')
  })

  describe('todo state', () => {
    beforeEach(() => {
      useTestTodos().addTodo('Escape planet earth')
    })

    it('initially is todo', () => {
      expect(useTestTodos().todos[0].state).toEqual('todo')
    })

    it('goes to doing when started', () => {
      useTestTodos().startTodo(useTestTodos().todos[0].id)
      expect(useTestTodos().todos[0].state).toEqual('doing')
    })

    it('goes to done when started then finishedd', () => {
      useTestTodos().startTodo(useTestTodos().todos[0].id)
      useTestTodos().finishTodo(useTestTodos().todos[0].id)
      expect(useTestTodos().todos[0].state).toEqual('done')
    })
  })

  it('sorts todos in the order added', () => {
    useTestTodos().addTodo('Escape planet earth')
    useTestTodos().addTodo('Make tea')

    const { todos } = useTestTodos()

    expect(todos.length).toEqual(2)
    expect(todos[0].title).toEqual('Escape planet earth')
    expect(todos[1].title).toEqual('Make tea')
  })

  it('can update an existing todo', () => {
    const isolated = isolateHook(useTodos)

    isolated().addTodo('Escape planet earth')
    isolated().addTodo('Make tea')

    isolated().updateTodoTitle(isolated().todos[1].id, 'Make proper tea')

    const { todos } = isolated()

    expect(todos.length).toEqual(2)
    expect(todos[0].title).toEqual('Escape planet earth')
    expect(todos[1].title).toEqual('Make proper tea')
  })

  it('can delete a todo', () => {
    const isolated = isolateHook(useTodos)

    isolated().addTodo('Escape planet earth')
    isolated().addTodo('Make tea')

    isolated().deleteTodo(isolated().todos[0].id)

    const { todos } = isolated()

    expect(todos.length).toEqual(1)
    expect(todos[0].title).toEqual('Make tea')
  })
})
