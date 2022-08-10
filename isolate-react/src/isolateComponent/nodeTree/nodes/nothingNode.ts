import { TreeNode } from '../../types'
export const nothingNode = (type: string): TreeNode => ({
  nodeType: 'nothing',
  type,
  name: '',
  children: [],
  props: {},
  content: () => null,
  toString: () => '',
})
