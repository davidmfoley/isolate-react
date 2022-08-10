import { isolateHook, IsolatedHook } from '../../isolateHook'
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

const applyProviderContext = (
  component: any,
  props: any,
  renderContext: RenderContext
) => {
  if (
    component._context &&
    componentIsContextProviderForType(component, component._context)
  ) {
    return renderContext.withContext(component._context, props.value)
  }
  return renderContext
}

const componentIsContextProviderForType = (component: any, t: any) => {
  return t === component?._context && component === t.Provider
}

export const isolatedRenderer = (
  renderContext: RenderContext
): IsolatedRenderer => {
  const render = <P>(
    component: React.ComponentClass<P, any> | React.FC<P>,
    props: P
  ) => {
    let tree: NodeTree
    let hookRenderer: IsolatedHook<any>

    const componentName = component.displayName || component.name || component
    renderContext = applyProviderContext(component, props, renderContext)

    const setContext = (t: any, v: any) => {
      renderContext = renderContext.withContext(t, v)
      hookRenderer?.setContext(t, v)
      tree?.setContext(t, v)
    }

    const renderMethod = getRenderMethod(component, setContext)

    hookRenderer = isolateHook(() => {
      let result: any

      try {
        result = renderMethod(props)
      } catch (e) {
        throw new Error(`Failed to render <${componentName}>: ${e.message}`)
      }

      try {
        if (tree) {
          tree.update(result)
        } else {
          tree = nodeTree(
            result,
            () => isolatedRenderer(renderContext.copy()),
            renderContext.shouldInline
          )
        }
      } catch (e) {
        throw new Error(
          `Failed to parse elements rendered by <${componentName}>: ${e.message}`
        )
      }

      const invalidPaths = tree.invalidNodePaths()
      if (invalidPaths.length)
        throw new Error(
          `Invalid element${
            invalidPaths.length > 1 ? 's' : ''
          } rendered by ${componentName}\nat:\n${invalidPaths
            .map((p) => p.join(' > '))
            .join('\n')}`
        )
    })

    renderContext.contexts.forEach(({ contextType, contextValue }) => {
      hookRenderer.setContext(contextType, contextValue)
    })

    hookRenderer()

    const setProps = (nextProps: P) => {
      props = nextProps
      hookRenderer()
    }

    const mergeProps = (propsToMerge: Partial<P>) => {
      setProps({ ...props, ...propsToMerge })
    }

    return {
      render: hookRenderer,
      cleanup: () => hookRenderer.cleanup(),
      setProps,
      setRef: hookRenderer.setRef,
      setContext: (t: any, v: any) => {
        if (componentIsContextProviderForType(component, t)) return
        setContext(t, v)
      },
      mergeProps,
      tree: () => tree,
      inlineAll: (selector: Selector) => {
        renderContext.addInlinedSelector(selector)

        hookRenderer.wrapUpdates(tree.inlineAll)
      },
      waitForRender: () => hookRenderer.waitForUpdate().then(() => {}),
      debug: () => tree.debug(),
    }
  }

  return { render, shouldInline: renderContext.shouldInline }
}
