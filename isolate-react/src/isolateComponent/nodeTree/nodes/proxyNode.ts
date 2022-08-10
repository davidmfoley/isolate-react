import { TreeNode } from '../../types'

export const proxyNode = (
  node: TreeNode
): TreeNode & { setNode: (node: TreeNode) => void } => {
  let inner = node
  let key: string | undefined

  return {
    get nodeType() {
      return inner.nodeType
    },
    get type() {
      return inner.type
    },
    get name() {
      return inner.name
    },
    get children() {
      return inner.children
    },
    get props() {
      return inner.props
    },

    get key() {
      return key
    },
    set key(val) {
      key = val
    },
    content: () => inner.content(),
    toString: () => inner.toString(),
    setNode: (node: TreeNode) => {
      inner = node
      key = node.key
    },
  }
}
