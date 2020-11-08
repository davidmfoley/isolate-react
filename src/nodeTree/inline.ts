import { IsolatedRenderer } from '../isolateComponent/isolatedRenderer'
import { TreeNode } from '../types'
import { parseIsolated } from './parse'

export const doInline = (renderer: IsolatedRenderer, node: TreeNode) => {
  if (node.nodeType === 'react' && renderer.shouldInline(node)) {
    const isolated = renderer.render(node.type as any, node.props)
    node = parseIsolated(isolated, node.type as any, node.key)
  } else if (node.nodeType === 'isolated') {
    node.componentInstance!.tree().inlineAll()
  } else {
    node.children.forEach((child, i) => {
      if (child.nodeType === 'react' && renderer.shouldInline(child)) {
        const isolated = renderer.render(child.type as any, child.props)
        child = parseIsolated(isolated, child.type as any, child.key)
        node.children[i] = child
      }

      doInline(renderer, child)
    })
  }

  return node
}
