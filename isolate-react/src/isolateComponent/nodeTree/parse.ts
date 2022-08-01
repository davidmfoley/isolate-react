import { ComponentNode } from '../types'
import { InputNode } from '../types/InputNode'
import { TreeNode } from '../types/TreeNode'
import { Selector } from '../types/Selector'
import {
  fragmentNode,
  functionNode,
  htmlNode,
  invalidNode,
  isolatedNode,
  nothingNode,
  reactNode,
  valueNode,
} from './nodes'
import nodeMatcher from '../nodeMatcher'
import { ComponentInstance } from '../types/ComponentInstance'
import { RenderableComponent } from '../types/RenderableComponent'
type NodePredicate = (node: TreeNode) => boolean

const normalizeChildren = (children: any) => {
  if (typeof children === 'undefined') return []
  if (Array.isArray(children)) return children
  return [children]
}

const isFragment = (node: InputNode) =>
  node.type.toString() === 'Symbol(react.fragment)'

const parseChildren = (children: InputNode[]) =>
  normalizeChildren(children).map(parse)

const parseRawNode = (node: InputNode): TreeNode => {
  if (node === null) return nothingNode('null')
  if (typeof node === 'undefined') return nothingNode('undefined')
  if (typeof node === 'function') return functionNode(node)

  // for now, treat array as fragment
  if (Array.isArray(node)) return fragmentNode(parseChildren(node))

  if (typeof node === 'string' || typeof node === 'number')
    return valueNode(node)

  if (typeof node === 'boolean') return nothingNode('' + node)

  const { children } = (node.props || {}) as any
  const props = node.props || {}

  const parsedChildren = parseChildren(children)

  if (node.type === null) {
    return invalidNode('null')
  }

  if (typeof node.type === 'undefined') {
    return invalidNode('undefined')
  }

  if (isFragment(node)) return fragmentNode(parsedChildren)

  if (typeof node.type === 'string')
    return htmlNode(node.type, props, parsedChildren)

  return reactNode(node.type as any, props, parsedChildren)
}

const allChildren = (e: TreeNode) =>
  e.children.map(allNodes).reduce((a, b) => a.concat(b), [])

const allNodes = (e: TreeNode) =>
  [e].concat(e.children.map(allNodes).reduce((a, b) => a.concat(b), []))

export const parseIsolated = (
  component: ComponentInstance<any>,
  componentType: RenderableComponent,
  key: string
) => {
  const isolated = isolatedNode(component, componentType)
  isolated.key = key
  return isolated
}

export const parse = (node: InputNode): ComponentNode => {
  const parsed = parseRawNode(node)
  if (node) parsed.key = '' + node.key

  const filter = (predicate: NodePredicate) =>
    allChildren(parsed).filter(predicate)
  const findAll = (selector?: Selector) => filter(nodeMatcher(selector))

  return {
    ...parsed,
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
  }
}
