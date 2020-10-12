import { InputNode, TreeNode } from './types'
import { nullNode, valueNode, fragmentNode, htmlNode, reactNode } from './nodes'
export { TreeNode }

type NodePredicate = (node: TreeNode) => boolean

const normalizeChildren = (children: any) => {
  if (typeof children === 'undefined') return []
  if (Array.isArray(children)) return children
  return [children]
}

const allNodes = (e: TreeNode) => {
  return [e].concat(e.children.map(allNodes).reduce((a, b) => a.concat(b), []))
}

const isFragment = (node: InputNode) =>
  node.type.toString() === 'Symbol(react.fragment)'

const parseChildren = (children: InputNode[]) =>
  normalizeChildren(children).map(parse)

const parse = (node: InputNode): TreeNode => {
  if (node === null) return nullNode()

  // for now, treat array as fragment
  if (Array.isArray(node)) return fragmentNode(parseChildren(node))

  if (typeof node === 'string' || typeof node === 'number')
    return valueNode(node)

  const { children, ...props } = (node.props || {}) as any

  const parsedChildren = parseChildren(children)
  if (isFragment(node)) return fragmentNode(parsedChildren)

  if (typeof node.type === 'string')
    return htmlNode(node.type, props, parsedChildren)
  return reactNode(node.type, props, parsedChildren)
}

export const nodeTree = (top: any /* React.ReactElement<any, any> */) => {
  const root = parse(top)
  return {
    root: () => root,
    all: () => allNodes(root),
    find: (predicate: NodePredicate) => allNodes(root).find(predicate),
    filter: (predicate: NodePredicate) => allNodes(root).filter(predicate),
  }
}

export type NodeTree = ReturnType<typeof nodeTree>
