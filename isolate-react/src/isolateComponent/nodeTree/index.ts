import { parse } from './parse'
import nodeMatcher, { NodeMatcher } from '../nodeMatcher'
import { TreeNode } from '../types/TreeNode'
import { Selector } from '../types/Selector'
import { IsolatedRenderer } from '../isolatedRenderer'
import { doInline } from './inline'
import { reconcile } from './reconcile'
import { doSetContext } from './context'
import { doDebug } from './debug'

const allNodes = (e: TreeNode) =>
  [e].concat(e.children.map(allNodes).reduce((a, b) => a.concat(b), []))

type TreeSource = any /* React.ReactElement<any, any> */

const describeSelector = (selector?: Selector) => {
  if (!selector) return '*'
  if (typeof selector === 'string') return selector
  if (selector.displayName) return selector.displayName
  if (typeof selector.name === 'string') return selector.name
  return `${selector}`
}

const findInvalidNodePaths = (node: TreeNode<any>, path: string[] = []) => {
  if (node.nodeType === 'invalid') return [[...path, node.name]]
  let invalidChildPaths = []
  for (const child of node.children)
    invalidChildPaths = [
      ...invalidChildPaths,
      ...findInvalidNodePaths(child, [...path, node.name]),
    ]
  return invalidChildPaths
}

export const nodeTree = (
  top: TreeSource,
  getRenderer: () => IsolatedRenderer,
  shouldInline: NodeMatcher
) => {
  let root = doInline(getRenderer, shouldInline, parse(top) as TreeNode)

  const filter = (predicate: (node: TreeNode) => boolean) =>
    allNodes(root).filter(predicate)
  const findAll = (selector?: Selector) => filter(nodeMatcher(selector))

  return {
    root: () => root,
    filter,
    exists: (selector?: Selector) => findAll(selector).length > 0,
    findAll,
    findOne: (selector?: Selector) => {
      const found = findAll(selector)

      if (found.length === 0)
        throw new Error(
          `Could not find element matching ${describeSelector(
            selector
          )} in ${root.toString()}`
        )
      if (found.length > 1)
        throw new Error(
          `Expected one element matching ${describeSelector(
            selector
          )} but found ${found.length} elements in ${root.toString()}`
        )
      return found[0]
    },
    toString: () => root.toString(),
    content: () => root.content(),
    inlineAll: () => {
      root = doInline(getRenderer, shouldInline, root)
    },
    setContext: (t, v) => {
      root = doSetContext(t, v, root)
    },
    update: (next: TreeSource) => {
      root = doInline(getRenderer, shouldInline, reconcile(root, parse(next)))
    },
    debug: () => doDebug(root),
    invalidNodePaths: () => findInvalidNodePaths(root, []),
  }
}

export type NodeTree = ReturnType<typeof nodeTree>
