import { TreeNode } from '../../types'
import { formatChildren } from './common'

export const fragmentNode = (children: TreeNode[]): TreeNode => ({
  nodeType: 'fragment',
  type: 'fragment',
  children,
  name: '',
  props: {},
  content: () => formatChildren(children),
  toString: () => formatChildren(children),
})
