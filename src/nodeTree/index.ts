import { TreeNode } from './types'
import { parse } from './parse'
export { TreeNode }
import nodeMatcher, { Selector } from '../nodeMatcher'

type NodePredicate = (node: TreeNode) => boolean

const allNodes = (e: TreeNode) => {
  return [e].concat(e.children.map(allNodes).reduce((a, b) => a.concat(b), []))
}

export const nodeTree = (top: any /* React.ReactElement<any, any> */) => {
  const root = parse(top)
  const filter = (predicate: NodePredicate) => allNodes(root).filter(predicate)
  const findAll = (selector?: Selector) => filter(nodeMatcher(selector))
  return {
    root: () => root,
    filter,
    exists: (selector?: Selector) => findAll(selector).length > 0,
    findAll,
    findOne: (selector?: Selector) => {
      const found = findAll(selector)
      if (found.length === 0)
        throw new Error(`Could not find element matching ${selector}`)
      if (found.length > 1)
        throw new Error(
          `Expected one element matching ${selector} but found ${found.length}`
        )
      return found[0]
    },
    toString: () => root.toString(),
    content: () => root.content(),
  }
}

export type NodeTree = ReturnType<typeof nodeTree>
