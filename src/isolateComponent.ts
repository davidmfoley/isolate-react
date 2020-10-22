import isolateHooks from 'isolate-hooks'
import { ClassesNotSupportedError } from './errors'
import { nodeTree, NodeTree } from './nodeTree'
import { IsolateComponent } from './types/IsolateComponent'
import { IsolatedComponent } from './types/IsolatedComponent'
import { Selector } from './types/Selector'

type Contexts = { contextType: React.Context<any>; contextValue: any }[]

const validateComponentElement = (componentElement: any) => {
  let proto = componentElement.type?.prototype
  if (proto?.isReactComponent) {
    throw new ClassesNotSupportedError()
  }
}

const isolateComponent_ = <P>(
  contexts: Contexts,
  componentElement: React.ReactElement<P, any>
): IsolatedComponent<P> => {
  let lastResult: React.ReactNode
  let props = componentElement.props
  let tree: NodeTree

  validateComponentElement(componentElement)

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
 * isolateComponent: Isolate a component for testing
 * @param componentElement - A react element, usually created with JSX.
 *
 *
 *
 * @example <caption>Basic usage</caption>
 *
 * ```js
 * const Hello = (props) => <h2>Hello {props.name}</h2>
 * const component = isolateComponent(<Hello name="Zaphod" />)
 *
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
 * @returns IsolatedComponent - see the {@link IsolatedCompoenent} docs for more information.
 * @typeparam Props - Type of the component's props
 **/
export const isolateComponent: IsolateComponent = isolateComponentWithContext(
  []
)
