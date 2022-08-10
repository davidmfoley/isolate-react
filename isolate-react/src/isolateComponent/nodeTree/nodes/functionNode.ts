import { TreeNode } from '../../types'

export const functionNode = (value: Function): TreeNode => ({
  nodeType: 'function',
  type: value,
  children: [],
  props: {},
  name: '',
  content: () => `[Function]`,
  toString: () => `[Function]`,
})
