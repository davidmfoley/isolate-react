import { parse, parseIsolated } from './parse'
import nodeMatcher from '../nodeMatcher'
import { TreeNode } from '../types/TreeNode'
import { Selector } from '../types/Selector'
import { IsolatedRenderer } from '../isolateComponent/isolatedRenderer'
import { ComponentNode } from '..'

const allNodes = (e: TreeNode) =>
  [e].concat(e.children.map(allNodes).reduce((a, b) => a.concat(b), []))

type TreeSource = any /* React.ReactElement<any, any> */

export const nodeTree = (top: TreeSource, renderer: IsolatedRenderer) => {
  let root = parse(top) as TreeNode
  const filter = (predicate: (node: TreeNode) => boolean) =>
    allNodes(root).filter(predicate)
  const findAll = (selector?: Selector) => filter(nodeMatcher(selector))

  const doInline = (
    matcher: ReturnType<typeof nodeMatcher>,
    renderer: IsolatedRenderer,
    node: TreeNode
  ) => {
    node.children = node.children.map((child) => {
      if (child.nodeType === 'react' && matcher(child)) {
        const isolated = renderer(child.type as any, child.props)
        return parseIsolated(isolated, child.type as any)
      }

      return child
    })
  }

  const matchChildren = (previous: TreeNode[], next: TreeNode[]) => {
    return next
  }

  const reconcile = (previous: TreeNode, next: TreeNode): TreeNode => {
    if (!previous) return next
    if (next.type !== previous.type) return next
    if (previous.nodeType === 'isolated') {
      previous.componentInstance!.setProps(next.props)
      previous.props = next.props
      previous.children = [previous.componentInstance.tree().root()]
      return previous
    }

    return {
      ...next,
      children: next.children.map((c, i) => reconcile(previous.children[i], c)),
    }
  }

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
    inlineAll: (selector: Selector) => {
      doInline(nodeMatcher(selector), renderer, root)
    },
    update: (next: TreeSource) => {
      root = reconcile(root, parse(next))
    },
  }
}

export type NodeTree = ReturnType<typeof nodeTree>
