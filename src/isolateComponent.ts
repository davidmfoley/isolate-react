import isolateHooks from 'isolate-hooks'
import { nodeTree, NodeTree } from './nodeTree'
import { IsolateComponent } from './types/IsolateComponent'
import { IsolatedComponent } from './types/IsolatedComponent'
import { Selector } from './types/Selector'

type Contexts = { contextType: React.Context<any>; contextValue: any }[]

const isolateComponent_ = <P>(
  contexts: Contexts,
  componentElement: React.ReactElement<P, any>
): IsolatedComponent<P> => {
  let lastResult: React.ReactNode
  let props = componentElement.props
  let tree: NodeTree

  const render = isolateHooks(() => {
    lastResult = componentElement.type(props)
    tree = nodeTree(lastResult)
  })

  contexts.forEach(({ contextType, contextValue }) => {
    render.setContext(contextType, contextValue)
  })

  render()

  return {
    findAll: (spec?: Selector) => tree.findAll(spec),
    findOne: (spec?: Selector) => tree.findOne(spec),
    exists: (spec: Selector) => tree.exists(spec),
    mergeProps: (propsToMerge: Partial<P>) => {
      props = { ...props, ...propsToMerge }
      render()
    },
    setProps: (nextProps: P) => {
      props = nextProps
      render()
    },
    content: () => tree.content(),
    toString: () => tree.toString(),
    cleanup: () => render.cleanup(),
  }
}

const isolateComponentWithContext = (contexts: Contexts) =>
  Object.assign(
    <Props>(componentElement: React.ReactElement<Props>) =>
      isolateComponent_(contexts, componentElement),
    {
      withContext: <T>(contextType: React.Context<T>, contextValue: T) =>
        isolateComponentWithContext(
          contexts.concat([{ contextType, contextValue }])
        ),
    }
  )

/**
 * Isolate a component for testing
 *
 * These docs are a work in progress -- the typescript-based doc tool is confused by a function that also has properties. Therefore the docs for this are here: {@link IsolateComponent} in the meantime.
 **/
export const isolateComponent: IsolateComponent = isolateComponentWithContext(
  []
)
