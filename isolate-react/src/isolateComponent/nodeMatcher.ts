import { Selector } from './types/Selector'
import { TreeNode } from './types/TreeNode'

const idMatcher = (spec: string): NodeMatcher => {
  const [tag, id] = spec.split('#')
  return (node) => (!tag || tag === node.name) && id === node.props.id
}

const classOrExactMatcher = (spec: string): NodeMatcher => {
  const [tag, className] = spec.split('.')
  return (node) =>
    ((!tag || tag === node.name) &&
      (node.props.className || '').split(' ').includes(className)) ||
    spec === node.name
}

const propMatcher = (spec: string): NodeMatcher => {
  const [name, rest] = spec.split('[')
  const [key, value] = rest.split(']')[0].split('=')
  return (node) => (!name || name === node.name) && node.props[key] === value
}

const nameMatcher = (spec: Selector): NodeMatcher => {
  return (node) => node.type === spec || node.name === spec
}

export const nodeMatcher = (spec: Selector | null | undefined): NodeMatcher => {
  if (!spec || spec === '*') return () => true
  if (typeof spec === 'string') {
    if (spec.includes('#')) {
      return idMatcher(spec)
    }

    if (/\[.+\]/.test(spec)) {
      return propMatcher(spec)
    }

    if (spec.includes('.')) {
      return classOrExactMatcher(spec)
    }
  }

  return nameMatcher(spec)
}

export default nodeMatcher

export type NodeMatcher = (node: TreeNode) => boolean
