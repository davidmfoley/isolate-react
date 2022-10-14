import { TreeNode } from '../../types'
import { formatChildren } from './common'

// for now, just render children and support inlining etc.
export const portalNode = (children: TreeNode[]): TreeNode => ({
  nodeType: 'portal',
  type: 'portal',
  children,
  name: '',
  props: {},
  content: () => formatChildren(children),
  toString: () => formatChildren(children),
})
