import isolateHooks from 'isolate-hooks'
import { nodeTree, NodeTree } from './nodeTree'
import { IsolateComponent } from './types/IsolateComponent'
import { IsolatedComponent } from './types/IsolatedComponent'
import { ReactComponentSelector, Selector } from './types/Selector'
import { wrapClassComponent } from './wrapClassComponent'

type Contexts = { contextType: React.Context<any>; contextValue: any }[]

type RenderMethod<P> = (props: P) => any

const getRenderMethod = <P>(t: any): RenderMethod<P> => {
  let proto = t.prototype
  if (proto?.isReactComponent) {
    return wrapClassComponent(t)
  }

  return t
}

const isolatedRenderer = (contexts: Contexts) => (
  component: ReactComponentSelector,
  props: any
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

  const setProps = (nextProps: any) => {
    props = nextProps
    render()
  }

  const mergeProps = (propsToMerge: any) => {
    setProps({ ...props, ...propsToMerge })
  }

  return {
    render,
    setProps,
    mergeProps,
    tree: () => tree,
  }
}

const isolateComponent_ = <P>(
  contexts: Contexts,
  componentElement: React.ReactElement<P, any>
): IsolatedComponent<P> => {
  const { render, tree, setProps, mergeProps } = isolatedRenderer(contexts)(
    componentElement.type,
    componentElement.props
  )

  return {
    findAll: (spec?: Selector) => tree().findAll(spec),
    findOne: (spec?: Selector) => tree().findOne(spec),
    exists: (spec: Selector) => tree().exists(spec),
    mergeProps,
    setProps,
    content: () => tree().content(),
    toString: () => tree().toString(),
    cleanup: () => render.cleanup(),
    inline: (selector?: ReactComponentSelector) => {},
    //tree.inlineAll(selector, isolateComponent_.bind(null, contexts)),
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
 * isolateComponent: Isolate a component for testing
 * This function accepts a react element rendering a functional component and returns an {@link IsolatedComponent} -- see the linked docs for more information.
 *
 * @param componentElement A react element, usually created with JSX.
 *
 * @example <caption>Import isolateComponent</caption>
 *
 * ```js
 * import { isolateComponent } from 'isolate-components'
 * ```
 *
 * @example <caption>Basic usage</caption>
 *
 * ```js
 * // the component we will isolate for testing
 * const Hello = (props) => <h2>Hello {props.name}</h2>
 * const component = isolateComponent(<Hello name="Zaphod" />)
 *
 * console.log(component.findOne('h2').content()) // => "Hello Zaphod"
 * console.log(component.toString()) // => "<h2>Hello Zaphod</h2>"
 * ```
 *
 * @example <caption>Use withContext to test a component that uses useContext</caption>
 *
 * ```js
 * const NameContext = React.createContext('')
 *
 * const HelloWithContext = (props) => {
 *   const name = useContext(NameContext)
 *   return  <h2>Hello {nameContext.value}</h2>
 * }
 *
 * // To test this component, inject a context value as follows:
 *
 * const component = isolateComponent.withContext(NameContext, 'Trillian')(<HelloWithContext />)
 * console.log(component.toString()) // => "<h2>Hello Trillian</h2>"
 *
 * ```
 *
 * withContext can be chained to set multiple context values
 *
 * @category Entry Point
 * @returns IsolatedComponent
 * @typeparam Props - Type of the component's props
 **/
export const isolateComponent: IsolateComponent = isolateComponentWithContext(
  []
)
