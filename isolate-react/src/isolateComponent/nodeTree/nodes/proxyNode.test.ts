import { describe, test } from 'mocha'
import { expect } from 'chai'
import { nothingNode } from './nothingNode'
import { htmlNode } from './htmlNode'
import { proxyNode } from './proxyNode'

describe('proxyNode', () => {
  const nothing = nothingNode('null')

  test('initial value', () => {
    const p = proxyNode(nothing)
    expect(p.nodeType).to.eq('nothing')
  })

  test('update value', () => {
    const something = htmlNode('span', {}, [])
    const p = proxyNode(nothing)
    p.setNode(something)
    expect(p.nodeType).to.eq('html')
    expect(p.toString()).to.eq(something.toString())
  })
})
