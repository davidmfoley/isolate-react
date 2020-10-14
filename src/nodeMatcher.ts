import { FindSpec } from '.'
import { TreeNode } from './nodeTree'

const nodeMatcher = (spec: FindSpec | null): ((node: TreeNode) => boolean) => {
  if (!spec) return () => true
  if (typeof spec === 'string') {
    if (spec.includes('#')) {
      const [tag, id] = spec.split('#')
      return (node) => (!tag || tag === node.name) && id === node.props.id
    }
  }

  return (node) => node.type === spec || node.name === spec
}

export default nodeMatcher
