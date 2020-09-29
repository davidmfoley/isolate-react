import { beforeEach, describe, it } from 'mocha'
import { expect } from 'chai'
import { TodoState, useTodos } from './useTodos'
import isolateHooks, { IsolatedHook } from '../../src'

describe('useTodos', () => {
  let isolated: IsolatedHook<TodoState>

  beforeEach(() => {
    isolated = isolateHooks(useTodos)
  })

  it('initially has no todos', () => {
    expect(isolated().todos).to.eql([])
  })

  it('can add a todo', () => {
    isolated().addTodo('Escape planet earth')

    const { todos } = isolated()

    expect(todos.length).to.eq(1)
    expect(todos[0].title).to.eq('Escape planet earth')
  })

  describe('todo state', () => {
    beforeEach(() => {
      isolated().addTodo('Escape planet earth')
    })
    it('initially is todo', () => {
      expect(isolated().todos[0].state).to.eq('todo')
    })

    it('goes to doing when started', () => {
      isolated().startTodo(isolated().todos[0].id)
      expect(isolated().todos[0].state).to.eq('doing')
    })

    it('goes to done when started then finishedd', () => {
      isolated().startTodo(isolated().todos[0].id)
      isolated().finishTodo(isolated().todos[0].id)
      expect(isolated().todos[0].state).to.eq('done')
    })
  })

  it('sorts todos in the order added', () => {
    isolated().addTodo('Escape planet earth')
    isolated().addTodo('Make tea')

    const { todos } = isolated()

    expect(todos.length).to.eq(2)
    expect(todos[0].title).to.eq('Escape planet earth')
    expect(todos[1].title).to.eq('Make tea')
  })

  it('can update an existing todo', () => {
    const isolated = isolateHooks(useTodos)

    isolated().addTodo('Escape planet earth')
    isolated().addTodo('Make tea')

    isolated().updateTodoTitle(isolated().todos[1].id, 'Make proper tea')

    const { todos } = isolated()

    expect(todos.length).to.eq(2)
    expect(todos[0].title).to.eq('Escape planet earth')
    expect(todos[1].title).to.eq('Make proper tea')
  })

  it('can delete a todo', () => {
    const isolated = isolateHooks(useTodos)

    isolated().addTodo('Escape planet earth')
    isolated().addTodo('Make tea')

    isolated().deleteTodo(isolated().todos[0].id)

    const { todos } = isolated()

    expect(todos.length).to.eq(1)
    expect(todos[0].title).to.eq('Make tea')
  })
})
