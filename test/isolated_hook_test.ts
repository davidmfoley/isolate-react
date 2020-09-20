import { describe, it } from 'mocha'
import { expect } from 'chai'
import { testInIsolation } from '../src'

describe('testInIsolation', () => {
  it('is a function', () => {
    expect(testInIsolation).to.be.a('function')
  })

})
