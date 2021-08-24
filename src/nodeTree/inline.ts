import { IsolatedRenderer } from '../isolatedRenderer'
import { TreeNode } from '../types'
import { parseIsolated } from './parse'

const inlineNode = (renderer: IsolatedRenderer, node: TreeNode) => {
  const isolated = renderer.render(node.type as any, node.props)
  return parseIsolated(isolated, node.type as any, node.key)
}

export const doInline = (renderer: IsolatedRenderer, node: TreeNode) => {
  if (node.nodeType === 'react' && renderer.shouldInline(node)) {
    return inlineNode(renderer, node)
  } else if (node.nodeType === 'isolated') {
    node.componentInstance!.tree().inlineAll()
  } else {
    node.children.forEach((child, i) => {
      if (child.nodeType === 'react' && renderer.shouldInline(child)) {
        child = inlineNode(renderer, child)
        node.children[i] = child
      }

      doInline(renderer, child)
    })
  }

  return node
}
