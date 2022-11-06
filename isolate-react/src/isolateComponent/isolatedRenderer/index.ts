import { isolateHook, IsolatedHook } from '../../isolateHook'
import { NodeMatcher } from '../nodeMatcher'
import { nodeTree, NodeTree } from '../nodeTree'
import { ComponentInstance } from '../types/ComponentInstance'
import { Selector } from '../types/Selector'
import { getRenderMethod } from './renderMethod'
import { RenderContext } from './renderContext'
import { applyProviderContext } from './applyProviderContext'
import { componentIsContextProviderForType } from './componentIsContextProviderForType'
export { Contexts } from './renderContext'

class IsolatedRendererError extends Error {
  constructor(
    message: string,
    originalError: Error & { originalError?: Error }
  ) {
    super(message)
    this.originalError = originalError.originalError || originalError
  }

  originalError: Error
}

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
    let hookRenderer: IsolatedHook<any>

    const componentName = component.displayName || component.name || component
    renderContext = applyProviderContext(component, props, renderContext)

    const setContext = (t: any, v: any) => {
      renderContext = renderContext.withContext(t, v)
      hookRenderer?.setContext(t, v)
      tree?.setContext(t, v)
    }

    const renderMethod = getRenderMethod(component, setContext)

    const renderComponent = () => {
      try {
        return renderMethod.render(props)
      } catch (e) {
        throw new IsolatedRendererError(
          `Failed to render <${componentName}>: ${e.message}`,
          e
        )
      }
    }

    const applyToNodeTree = (tree: NodeTree, result: any): NodeTree => {
      if (tree) {
        tree.update(result)
      } else {
        tree = nodeTree(
          result,
          () => isolatedRenderer(renderContext.copy()),
          renderContext.shouldInline
        )
      }

      return tree
    }

    const assertNoInvalidPaths = (tree: NodeTree) => {
      const invalidPaths = tree.invalidNodePaths()
      if (!invalidPaths.length) return

      throw new Error(
        `Invalid element${
          invalidPaths.length > 1 ? 's' : ''
        } rendered by ${componentName}\nat:\n${invalidPaths
          .map((p) => p.join(' > '))
          .join('\n')}`
      )
    }

    hookRenderer = isolateHook(() => {
      const result = renderComponent()

      tree = applyToNodeTree(tree, result)

      assertNoInvalidPaths(tree)
    })

    const doRender = () => {
      try {
        hookRenderer()
      } catch (e) {
        const handleErrorResult = renderMethod.tryToHandleError(
          e.originalError || e
        )

        if (!handleErrorResult.handled) throw e

        hookRenderer()
      }
    }

    renderContext.contexts.forEach(({ contextType, contextValue }) => {
      hookRenderer.setContext(contextType, contextValue)
    })

    const setProps = (nextProps: P) => {
      props = nextProps
      doRender()
    }

    const mergeProps = (propsToMerge: Partial<P>) => {
      setProps({ ...props, ...propsToMerge })
    }

    doRender()

    return {
      render: doRender,
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

        hookRenderer.wrapUpdates(() => {
          try {
            tree.inlineAll()
          } catch (e) {
            const handleErrorResult = renderMethod.tryToHandleError(
              e.originalError || e
            )

            if (!handleErrorResult.handled) throw e
          }
        })
      },
      waitForRender: () => hookRenderer.waitForUpdate().then(() => {}),
      debug: () => tree.debug(),
    }
  }

  return { render, shouldInline: renderContext.shouldInline }
}
