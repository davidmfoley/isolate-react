import isolateHooks from 'isolate-hooks'
import { NodeMatcher } from '../nodeMatcher'
import { nodeTree, NodeTree } from '../nodeTree'
import { ComponentInstance } from '../types/ComponentInstance'
import { Selector } from '../types/Selector'
import { getRenderMethod } from './renderMethod'
import { RenderContext } from './renderContext'

export type Contexts = { contextType: React.Context<any>; contextValue: any }[]

export type IsolatedRenderer = {
  render: <P>(
    component: React.ComponentClass<P, any> | React.FC<P>,
    props: P
  ) => ComponentInstance<P>

  shouldInline: NodeMatcher
}

export const isolatedRenderer = (
  renderContext: RenderContext
): IsolatedRenderer => {
  const render = <P>(
    component: React.ComponentClass<P, any> | React.FC<P>,
    props: P
  ) => {
    let tree: NodeTree

    const renderMethod = getRenderMethod(component)

    const createTree = (result: any) => {
      tree = nodeTree(result, isolatedRenderer(renderContext))
      renderHandler = updateTree
    }

    const updateTree = (result: any) => tree.update(result)

    let renderHandler = createTree

    const render = isolateHooks(() => {
      const result = renderMethod(props)
      renderHandler(result)
    })

    renderContext.contexts.forEach(({ contextType, contextValue }) => {
      render.setContext(contextType, contextValue)
    })

    render()

    const setProps = (nextProps: P) => {
      props = nextProps
      render()
    }

    const mergeProps = (propsToMerge: Partial<P>) => {
      setProps({ ...props, ...propsToMerge })
    }

    return {
      render,
      cleanup: () => render.cleanup(),
      setProps,
      mergeProps,
      tree: () => tree,
      inlineAll: (selector: Selector) => {
        renderContext.addInlinedSelector(selector)
        tree.inlineAll()
      },
    }
  }
  return { render, shouldInline: renderContext.shouldInline }
}
