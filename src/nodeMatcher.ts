import { Selector } from './types/Selector'
import { TreeNode } from './types/TreeNode'

export const nodeMatcher = (spec: Selector | null | undefined): NodeMatcher => {
  if (!spec || spec === '*') return () => true
  if (typeof spec === 'string') {
    if (spec.includes('#')) {
      const [tag, id] = spec.split('#')
      return (node) => (!tag || tag === node.name) && id === node.props.id
    }
    if (spec.includes('.')) {
      const [tag, className] = spec.split('.')
      return (node) =>
        ((!tag || tag === node.name) &&
          node.props.className.split(' ').includes(className)) ||
        spec === node.name
    }

    if (/\[.+\]/.test(spec)) {
      const [name, rest] = spec.split('[')
      const [key, value] = rest.split(']')[0].split('=')
      return (node) =>
        (!name || name === node.name) && node.props[key] === value
    }
  }

  return (node) => node.type === spec || node.name === spec
}

export default nodeMatcher

export type NodeMatcher = (node: TreeNode) => boolean
