import { InputNode, TreeNode } from './types'
import {
  nullNode,
  valueNode,
  fragmentNode,
  htmlNode,
  reactNode,
  falseNode,
} from './nodes'

const normalizeChildren = (children: any) => {
  if (typeof children === 'undefined') return []
  if (Array.isArray(children)) return children
  return [children]
}

const isFragment = (node: InputNode) =>
  node.type.toString() === 'Symbol(react.fragment)'

const parseChildren = (children: InputNode[]) =>
  normalizeChildren(children).map(parse)

export const parse = (node: InputNode): TreeNode => {
  if (node === null) return nullNode()

  // for now, treat array as fragment
  if (Array.isArray(node)) return fragmentNode(parseChildren(node))

  if (typeof node === 'string' || typeof node === 'number')
    return valueNode(node)

  if (node === false) return falseNode()

  const { children, ...props } = (node.props || {}) as any

  const parsedChildren = parseChildren(children)
  if (isFragment(node)) return fragmentNode(parsedChildren)

  if (typeof node.type === 'string')
    return htmlNode(node.type, props, parsedChildren)
  return reactNode(node.type, props, parsedChildren)
}
