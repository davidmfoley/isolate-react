import { parse } from './parse'
import nodeMatcher from '../nodeMatcher'
import { TreeNode } from '../types/TreeNode'
import { Selector } from '../types/Selector'

const allNodes = (e: TreeNode) =>
  [e].concat(e.children.map(allNodes).reduce((a, b) => a.concat(b), []))

export const nodeTree = (top: any /* React.ReactElement<any, any> */) => {
  const root = parse(top)
  const filter = (predicate: (node: TreeNode) => boolean) =>
    allNodes(root).filter(predicate)
  const findAll = (selector?: Selector) => filter(nodeMatcher(selector))

  /*
  const inline = (
    isolateComponent: IsolateComponent,
    matcher: (n: TreeNode) => boolean,
    node: TreeNode
  ): ComponentNode => {
    node.children = node.children.map((child) => {
      if (!matcher(node) || node.type !== 'react') return child
      const isolatedComponent = isolateComponent(node.sourceElement)
      return {
        type: 'isolated',
        children: [parse(isolatedComponent)],
        isolatedComponent: isolateComponent(node.sourceElement),
      }
    })
    for (let child of node.children) {
      if (matcher(child)) {
      }
    }
  }
  */

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
    /*
    inlineAll: (selector?: ReactComponentSelector, isolate: IsolateComponent) => {
      let matches: TreeNode[]
      const matcher = nodeMatcher(selector)
      do {
        matches = 
      }
    }
    */
  }
}

export type NodeTree = ReturnType<typeof nodeTree>
