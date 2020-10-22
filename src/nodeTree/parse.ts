import { ComponentNode, InputNode, TreeNode } from './types'
import {
  valueNode,
  fragmentNode,
  htmlNode,
  reactNode,
  nothingNode,
} from './nodes'
import nodeMatcher, { Selector } from '../nodeMatcher'
type NodePredicate = (node: TreeNode) => boolean

const normalizeChildren = (children: any) => {
  if (typeof children === 'undefined') return []
  if (Array.isArray(children)) return children
  return [children]
}

const isFragment = (node: InputNode) =>
  node.type.toString() === 'Symbol(react.fragment)'

const parseChildren = (children: InputNode[]) =>
  normalizeChildren(children).map(parse)

const parseRawNode = (node: InputNode): TreeNode => {
  if (node === null) return nothingNode('null')
  if (typeof node === 'undefined') return nothingNode('undefined')

  // for now, treat array as fragment
  if (Array.isArray(node)) return fragmentNode(parseChildren(node))

  if (typeof node === 'string' || typeof node === 'number')
    return valueNode(node)

  if (typeof node === 'boolean') return nothingNode(node.toString())

  const { children, ...props } = (node.props || {}) as any

  const parsedChildren = parseChildren(children)
  if (isFragment(node)) return fragmentNode(parsedChildren)

  if (typeof node.type === 'string')
    return htmlNode(node.type, props, parsedChildren)
  return reactNode(node.type, props, parsedChildren)
}

const allChildren = (e: TreeNode) =>
  e.children.map(allNodes).reduce((a, b) => a.concat(b), [])

const allNodes = (e: TreeNode) =>
  [e].concat(e.children.map(allNodes).reduce((a, b) => a.concat(b), []))

export const parse = (node: InputNode): ComponentNode => {
  const parsed = parseRawNode(node)
  const filter = (predicate: NodePredicate) =>
    allChildren(parsed).filter(predicate)
  const findAll = (selector?: Selector) => filter(nodeMatcher(selector))

  return {
    ...parsed,
    exists: (selector?: Selector) => findAll(selector).length > 0,
    findAll,
    findOne: (selector?: Selector) => {
      const found = findAll(selector)
      if (found.length === 0)
        throw new Error(`Could not find element matching ${selector}`)
      if (found.length > 1)
        throw new Error(
          `Expected one element matching ${selector} but found ${found.length}`
        )
      return found[0]
    },
  }
}
