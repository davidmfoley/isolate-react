import { TreeNode } from '../../types'

export const valueNode = (value: string | number): TreeNode => ({
  nodeType: typeof value as any,
  type: '' + value,
  children: [],
  props: {},
  name: '',
  content: () => ('' + value) as string,
  toString: () => '' + value,
})
