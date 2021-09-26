import { IsolatedRenderer } from '../isolatedRenderer'
import { NodeMatcher } from '../nodeMatcher'
import { TreeNode } from '../types'
import { parseIsolated } from './parse'

const inlineNode = (renderer: IsolatedRenderer, node: TreeNode) => {
  const isolated = renderer.render(node.type as any, node.props)
  return parseIsolated(isolated, node.type as any, node.key)
}

export const doInline = (
  getRenderer: () => IsolatedRenderer,
  shouldInline: NodeMatcher,
  node: TreeNode
) => {
  if (node.nodeType === 'react' && shouldInline(node)) {
    return inlineNode(getRenderer(), node)
  } else if (node.nodeType === 'isolated') {
    node.componentInstance!.tree().inlineAll()
  } else {
    node.children.forEach((child, i) => {
      if (child.nodeType === 'react' && shouldInline(child)) {
        child = inlineNode(getRenderer(), child)
        node.children[i] = child
      }

      doInline(getRenderer, shouldInline, child)
    })
  }

  return node
}
