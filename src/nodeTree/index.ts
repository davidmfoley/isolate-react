import { TreeNode } from './types'
import { parse } from './parse'
export { TreeNode }

type NodePredicate = (node: TreeNode) => boolean

const allNodes = (e: TreeNode) => {
  return [e].concat(e.children.map(allNodes).reduce((a, b) => a.concat(b), []))
}

export const nodeTree = (top: any /* React.ReactElement<any, any> */) => {
  const root = parse(top)
  return {
    root: () => root,
    all: () => allNodes(root),
    find: (predicate: NodePredicate) => allNodes(root).find(predicate),
    filter: (predicate: NodePredicate) => allNodes(root).filter(predicate),
  }
}

export type NodeTree = ReturnType<typeof nodeTree>
