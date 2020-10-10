type InputNode = any //ReturnType<typeof React.createElement>

export interface TreeNode {
  nodeType: 'react' | 'html' | 'string' | 'null'
  type: InputNode['type']
  children: TreeNode[]
  props: any
  content: () => string | null
}

type NodePredicate = (node: TreeNode) => boolean

const normalizeChildren = (children: any) => {
  if (typeof children === 'undefined') return []
  if (Array.isArray(children)) return children
  return [children]
}

const allNodes = (e: TreeNode) => {
  return [e].concat(e.children.map(allNodes).reduce((a, b) => a.concat(b), []))
}

const getNodeType = (node: InputNode) => {
  return typeof node.type === 'function' ? 'react' : 'html'
}

const parse = (node: InputNode): TreeNode => {
  if (node === null) {
    return {
      nodeType: 'null',
      type: 'null',
      children: [],
      props: {},
      content: () => null,
    }
  }
  if (typeof node === 'string')
    return {
      nodeType: 'string',
      type: node,
      children: [],
      props: {},
      content: () => node as string,
    }

  const { children, ...props } = node.props as any

  const parsedChildren = normalizeChildren(children).map(parse)
  return {
    nodeType: getNodeType(node),
    type: node.type,
    children: parsedChildren,
    props,
    content: () => parsedChildren.map((c) => c.content()).join(''),
  }
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
