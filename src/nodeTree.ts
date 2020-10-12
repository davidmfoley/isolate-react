type InputNode = any //ReturnType<typeof React.createElement>

/**
 * A node -- react component, html element, or string -- that was rendered by the component under test.
 *
 * Useful for getting access to props to assert that they have the correct value, or to trigger handlers like `onClick` or `onChange` to exercise the component.
 *
 * Also provides `toString()` and `content()` helpers for debugging.
 *
 * @interface
 *
 */
export interface TreeNode {
  /**
   * The type of node: a react component, html, string or null.
   */
  nodeType: 'react' | 'html' | 'string' | 'number' | 'null' | 'fragment'
  /**
   * The `type` as returned from React.createElement
   * For a react FC, the component function.
   * For an html node, the tag name.
   * For a string, the string.
   */
  type: InputNode['type']
  /**
   * Children, if present, or else an empty array
   */
  children: TreeNode[]
  /**
   * React or html props, excluding children.
   */
  props: any
  /**
   * Returns the inner content of the node, formatted for debugging
   */
  content(): string | null
  /**
   * Returns the outer content of the node (including its tag and props), formatted for debugging
   */
  toString(): string
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

const valueNode = (value: string | number): TreeNode => ({
  nodeType: typeof value as any,
  type: value,
  children: [],
  props: {},
  content: () => ('' + value) as string,
  toString: () => '' + value,
})

const displayName = (type: any): string => {
  if (typeof type === 'string' || typeof type === 'number') return '' + type

  return type.displayName || type.name
}
const isFragment = (node: InputNode) =>
  node.type.toString() === 'Symbol(react.fragment)'

const fragmentNode = (children: InputNode[]): TreeNode => ({
  nodeType: 'fragment',
  type: 'fragment',
  children,
  props: {},
  content: () => formatChildren(children),
  toString: () => formatChildren(children),
})

const formatPropValue = (v: any) => {
  if (typeof v === 'string') return `"${v}"`
  return `{${v}}`
}

const formatProps = (props: any) => {
  const keys = Object.keys(props).sort()
  if (keys.length === 0) return ''
  return ` ${keys.map((k) => `${k}=${formatPropValue(props[k])}`).join(' ')}`
}

const formatChildren = (children: any[]) =>
  children.map((c: TreeNode) => c.toString()).join('')

const componentToString = (value: any, children: TreeNode[], props: any) => {
  const formattedProps = formatProps(props)
  const formattedChildren = formatChildren(children)
  const name = displayName(value)
  return `<${name}${formattedProps}${
    children.length ? `>${formattedChildren}</${name}>` : `/>`
  }`
}

const parseChildren = (children: InputNode[]) => 
   normalizeChildren(children).map(parse)

const parse = (node: InputNode): TreeNode => {
  if (node === null) return nullNode()

  if (Array.isArray(node)) return fragmentNode(parseChildren(node))
  if (typeof node === 'string' || typeof node === 'number')
    return valueNode(node)

  const { children, ...props } = (node.props || {}) as any

  const parsedChildren = parseChildren(children)
  if (isFragment(node)) return fragmentNode(parsedChildren)

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
