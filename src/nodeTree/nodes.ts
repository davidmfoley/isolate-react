import { TreeNode } from './types'

const formatChildren = (children: any[]) =>
  children.map((c: TreeNode) => c.toString()).join('')

const displayName = (type: any): string => {
  if (typeof type === 'string' || typeof type === 'number') return '' + type

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
  const formattedChildren = formatChildren(children)
  const name = displayName(value)
  return `<${name}${formattedProps}${
    children.length ? `>${formattedChildren}</${name}>` : ` />`
  }`
}

export const nothingNode = (type: string): TreeNode => ({
  nodeType: 'nothing',
  type,
  name: '',
  children: [],
  props: {},
  content: () => null,
  toString: () => '',
})

export const valueNode = (value: string | number): TreeNode => ({
  nodeType: typeof value as any,
  type: value,
  children: [],
  props: {},
  name: '',
  content: () => ('' + value) as string,
  toString: () => '' + value,
})

export const fragmentNode = (children: TreeNode[]): TreeNode => ({
  nodeType: 'fragment',
  type: 'fragment',
  children,
  name: '',
  props: {},
  content: () => formatChildren(children),
  toString: () => formatChildren(children),
})

export const reactNode = (
  fc: React.FC<any>,
  props: any,
  children: TreeNode[]
): TreeNode => ({
  nodeType: 'react',
  type: fc,
  name: displayName(fc),
  children,
  props,
  content: () => children.map((c: TreeNode) => c.toString()).join(''),
  toString: () => componentToString(fc, children, props),
})

export const htmlNode = (
  tag: string,
  props: any,
  children: TreeNode[]
): TreeNode => ({
  nodeType: 'html',
  type: tag,
  name: tag,
  children,
  props,
  content: () => children.map((c: TreeNode) => c.toString()).join(''),
  toString: () => componentToString(tag, children, props),
})
