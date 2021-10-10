import { TreeNode } from '../types/TreeNode'

export const doSetContext = (type: any, value: any, node: TreeNode) => {
  if (node.nodeType === 'isolated') {
    node.componentInstance!.setContext(type, value)
  } else {
    node.children?.forEach((child) => {
      doSetContext(type, value, child)
    })
  }

  return node
}
