import nodeMatcher, { NodeMatcher } from '../nodeMatcher'
import { TreeNode } from '../types'
import { Selector } from '../types/Selector'

export type Contexts = { contextType: React.Context<any>; contextValue: any }[]

export interface RenderContext {
  inlinedSelectors: Selector[]
  contexts: Contexts
  addInlinedSelector: (selector: Selector) => void
  shouldInline: (node: TreeNode) => boolean
}

export const makeRenderContext = (contexts: Contexts): RenderContext => {
  const inlinedMatchers: NodeMatcher[] = []

  return {
    inlinedSelectors: [],
    contexts,
    addInlinedSelector: (selector: Selector) => {
      inlinedMatchers.push(nodeMatcher(selector))
    },
    shouldInline: (node: TreeNode) => !!inlinedMatchers.find((m) => m(node)),
  }
}
