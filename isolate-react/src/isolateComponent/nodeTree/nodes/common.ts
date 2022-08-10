import { TreeNode } from '../../types'

export const displayName = (type: any): string => {
  if (typeof type === 'string' || typeof type === 'number') return '' + type

  return type.displayName || type.name
}

export const formatChildren = (children: any[]) =>
  children.map((c: TreeNode) => c.toString()).join('')

const formatPropValue = (v: any) => {
  if (typeof v === 'string') return `"${v}"`
  return `{${v}}`
}

const formatProps = (props: any) => {
  const keys = Object.keys(props)
    .filter((k) => k !== 'children')
    .sort()
  if (keys.length === 0) return ''
  return ` ${keys.map((k) => `${k}=${formatPropValue(props[k])}`).join(' ')}`
}

export const componentToString = (
  value: any,
  children: TreeNode[],
  props: any
) => {
  const formattedProps = formatProps(props)
  const formattedChildren = formatChildren(children)
  const name = displayName(value)
  return `<${name}${formattedProps}${
    children.length ? `>${formattedChildren}</${name}>` : ` />`
  }`
}
