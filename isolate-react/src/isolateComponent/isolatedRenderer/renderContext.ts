import nodeMatcher, { NodeMatcher } from '../nodeMatcher'
import { TreeNode } from '../types'
import { Selector } from '../types/Selector'

export type Contexts = { contextType: React.Context<any>; contextValue: any }[]

export interface RenderContext {
  contexts: Contexts
  addInlinedSelector: (selector: Selector) => void
  shouldInline: (node: TreeNode) => boolean
  withContext: (type: any, value: any) => RenderContext
  copy: () => RenderContext
}

export const makeRenderContext = (
  contexts: Contexts,
  inlinedMatchers: NodeMatcher[] = []
): RenderContext => {
  return {
    copy: () => makeRenderContext(contexts.slice(), inlinedMatchers),
    contexts,
    addInlinedSelector: (selector: Selector) => {
      inlinedMatchers.push(nodeMatcher(selector))
    },
    shouldInline: (node: TreeNode) => !!inlinedMatchers.find((m) => m(node)),
    withContext: (contextType: any, contextValue: any) =>
      makeRenderContext(
        contexts
          .filter((c) => c.contextType !== contextType)
          .concat({ contextType, contextValue }),
        inlinedMatchers
      ),
  }
}
