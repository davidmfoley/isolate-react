import { TreeNode } from '../../types'
import { componentToString, formatChildren } from './common'

export const htmlNode = (
  tag: string,
  props: any,
  children: TreeNode[]
): TreeNode => ({
  nodeType: 'html',
  type: tag,
  name: tag,
  children,
  props,
  content: () => formatChildren(children),
  toString: () => componentToString(tag, children, props),
})
