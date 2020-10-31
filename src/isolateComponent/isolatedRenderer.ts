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

export const isolatedRenderer = (contexts: Contexts): IsolatedRenderer => <P>(
  component: React.ComponentClass<P, any> | React.FC<P>,
  props: P
) => {
  let lastResult: React.ReactNode
  let tree: NodeTree

  const renderMethod = getRenderMethod(component)

  const render = isolateHooks(() => {
    lastResult = renderMethod(props)
    tree = nodeTree(lastResult)
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
