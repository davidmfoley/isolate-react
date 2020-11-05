import isolateHooks from 'isolate-hooks'
import { nodeTree, NodeTree } from '../nodeTree'
import { ComponentInstance } from '../types/ComponentInstance'
import { wrapClassComponent } from './wrapClassComponent'

export type Contexts = { contextType: React.Context<any>; contextValue: any }[]

type RenderMethod<P> = (props: P) => any

const getRenderMethod = <P>(t: any): RenderMethod<P> => {
  let proto = t.prototype
  if (proto?.isReactComponent) {
    return wrapClassComponent(t)
  }

  return t
}

export type IsolatedRenderer = <P>(
  component: React.ComponentClass<P, any> | React.FC<P>,
  props: P
) => ComponentInstance<P>

export const isolatedRenderer = (contexts: Contexts): IsolatedRenderer => {
  return <P>(
    component: React.ComponentClass<P, any> | React.FC<P>,
    props: P
  ) => {
    let tree: NodeTree

    const renderMethod = getRenderMethod(component)

    const createTree = (result: any) => {
      tree = nodeTree(result, isolatedRenderer(contexts))
      renderHandler = updateTree
    }

    const updateTree = (result: any) => tree.update(result)

    let renderHandler = createTree

    const render = isolateHooks(() => {
      const result = renderMethod(props)
      renderHandler(result)
    })

    contexts.forEach(({ contextType, contextValue }) => {
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
    }
  }
}
