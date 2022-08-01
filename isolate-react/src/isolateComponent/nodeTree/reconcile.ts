import { TreeNode } from '../types'
import { fragmentNode, htmlNode } from './nodes'

const matchChildren = (
  previous: TreeNode[],
  next: TreeNode[]
): [TreeNode | null, TreeNode][] => {
  const getKey = (node: TreeNode, index: number) => {
    return node.key || `___${index}__`
  }
  const previousByKey: { [k: string]: TreeNode } = {}
  previous.forEach((node, i) => {
    const key = getKey(node, i)
    previousByKey[key] = node
  })
  return next.map((node, i) => [previousByKey[getKey(node, i)] || null, node])
}

export const reconcile = (
  previous: TreeNode | null,
  next: TreeNode
): TreeNode => {
  if (!previous) return next
  if (next.type !== previous.type) return next

  if (previous.nodeType === 'isolated') {
    previous.componentInstance!.setProps(next.props)
    return previous
  }

  const matchedChildren = matchChildren(previous.children, next.children)
  const reconciledChildren = matchedChildren.map(([p, n]) => reconcile(p, n))

  if (previous.nodeType === 'html') {
    return htmlNode(next.type as string, next.props, reconciledChildren)
  }

  if (previous.nodeType === 'fragment') {
    return fragmentNode(reconciledChildren)
  }

  return {
    ...next,
    children: reconciledChildren,
  }
}
