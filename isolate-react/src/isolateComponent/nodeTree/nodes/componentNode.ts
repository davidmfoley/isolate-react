import { TreeNode } from '../../types'
import { componentToString, displayName, formatChildren } from './common'

export const componentNode = (
  fc: React.FC<any>,
  props: any,
  children: TreeNode[]
): TreeNode => ({
  nodeType: 'react',
  type: fc,
  name: displayName(fc),
  children,
  props,
  content: () => formatChildren(children),
  toString: () => componentToString(fc, children, props),
})
