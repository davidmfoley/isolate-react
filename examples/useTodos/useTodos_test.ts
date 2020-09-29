import { describe, it } from 'mocha'
import { expect } from 'chai'
import { useTodos } from './useTodos'

describe('useTodos', () => {
  it('initially has no todos', () => {
    const [state] = useTodos()
    expect(state.todos).to.eql([])
  })
})
