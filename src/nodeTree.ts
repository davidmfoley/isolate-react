type InputNode = any //ReturnType<typeof React.createElement>

export interface TreeNode {
  nodeType: 'react' | 'html' | 'string' | 'null'
  type: InputNode['type']
  children: TreeNode[]
  props: any
  content: () => string | null
  toString: () => string
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

const nullNode = (): TreeNode => ({
  nodeType: 'null',
  type: 'null',
  children: [],
  props: {},
  content: () => null,
  toString: () => '',
})

const stringNode = (value: string): TreeNode => ({
  nodeType: 'string',
  type: value,
  children: [],
  props: {},
  content: () => value as string,
  toString: () => value,
})

const displayName = (type: any): string => {
  if (typeof type === 'string') return type

  return type.displayName || type.name
}

const formatPropValue = (v: any) => {
  if (typeof v === 'string') return `"${v}"`
  return `{${v}}`
}

const formatProps = (props: any) => {
  const keys = Object.keys(props).sort()
  if (keys.length === 0) return ''
  return ` ${keys.map((k) => `${k}=${formatPropValue(props[k])}`).join(' ')}`
}

const componentToString = (value: any, children: TreeNode[], props: any) => {
  const formattedProps = formatProps(props)
  const formattedChildren = children.map((c: TreeNode) => c.toString()).join('')
  const name = displayName(value)
  return `<${name}${formattedProps}${
    children.length ? `>${formattedChildren}</${name}>` : `/>`
  }`
}

const parse = (node: InputNode): TreeNode => {
  if (node === null) return nullNode()
  if (typeof node === 'string') return stringNode(node)

  const { children, ...props } = node.props as any

  const parsedChildren = normalizeChildren(children).map(parse)
  return {
    nodeType: getNodeType(node),
    type: node.type,
    children: parsedChildren,
    props,
    content: () => parsedChildren.map((c: TreeNode) => c.toString()).join(''),
    toString: () => componentToString(node.type, parsedChildren, props),
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
