import { TreeNode } from '../../types'
import { componentNode } from './componentNode'
import { proxyNode } from './proxyNode'

export const reactNode = (
  fc: React.FC<any>,
  props: any,
  children: TreeNode[]
): TreeNode => {
  const proxy = proxyNode(componentNode(fc, props, children))
  return proxy
}
