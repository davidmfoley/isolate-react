import { TreeNode } from '../../types'
export const invalidNode = (type: string): TreeNode => ({
  nodeType: 'invalid',
  type,
  children: [],
  name: type,
  props: {},
  content: () => `(INVALID: ${type})`,
  toString: () => `(INVALID: ${type})`,
})
