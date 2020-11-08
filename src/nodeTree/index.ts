import { parse, parseIsolated } from './parse'
import nodeMatcher, { NodeMatcher } from '../nodeMatcher'
import { TreeNode } from '../types/TreeNode'
import { Selector } from '../types/Selector'
import { IsolatedRenderer } from '../isolateComponent/isolatedRenderer'

const allNodes = (e: TreeNode) =>
  [e].concat(e.children.map(allNodes).reduce((a, b) => a.concat(b), []))

type TreeSource = any /* React.ReactElement<any, any> */

export const nodeTree = (top: TreeSource, renderer: IsolatedRenderer) => {
  let root = parse(top) as TreeNode

  const filter = (predicate: (node: TreeNode) => boolean) =>
    allNodes(root).filter(predicate)
  const findAll = (selector?: Selector) => filter(nodeMatcher(selector))

  const doInline = (node: TreeNode) => {
    if (node.nodeType === 'react' && renderer.shouldInline(node)) {
      const isolated = renderer.render(node.type as any, node.props)
      node = parseIsolated(isolated, node.type as any, node.key)
    } else if (node.nodeType === 'isolated') {
      node.componentInstance!.tree().inlineAll()
    } else {
      node.children.forEach((child, i) => {
        if (child.nodeType === 'react' && renderer.shouldInline(child)) {
          const isolated = renderer.render(child.type as any, child.props)
          child = parseIsolated(isolated, child.type as any, child.key)
          node.children[i] = child
        }

        doInline(child)
      })
    }

    return node
  }

  const matchChildren = (
    previous: TreeNode[],
    next: TreeNode[]
  ): [TreeNode | null, TreeNode][] => {
    const getKey = (node: TreeNode, index: number) => {
      return node.key || `___${index}__`
    }
    const previousByKey: { [k: string]: TreeNode } = {}
    previous.forEach((node, i) => {
      const key = getKey(node, i)
      previousByKey[key] = node
    })
    return next.map((node, i) => [previousByKey[getKey(node, i)] || null, node])
  }

  const reconcile = (previous: TreeNode | null, next: TreeNode): TreeNode => {
    if (!previous) return next
    if (next.type !== previous.type) return next
    if (previous.nodeType === 'isolated') {
      previous.componentInstance!.setProps(next.props)
      return previous
    }

    const matchedChildren = matchChildren(previous.children, next.children)
    return {
      ...next,
      children: matchedChildren.map(([p, n]) => reconcile(p, n)),
    }
  }

  const applyInline = () => {
    root = doInline(root)
  }

  applyInline()

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
    inlineAll: () => {
      applyInline()
    },
    update: (next: TreeSource) => {
      root = reconcile(root, parse(next))
      applyInline()
    },
  }
}

export type NodeTree = ReturnType<typeof nodeTree>
