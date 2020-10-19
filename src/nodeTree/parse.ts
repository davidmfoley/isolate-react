import { InputNode, TreeNode } from './types'
import {
  valueNode,
  fragmentNode,
  htmlNode,
  reactNode,
  nothingNode,
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
