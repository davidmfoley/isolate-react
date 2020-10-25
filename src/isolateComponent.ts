import isolateHooks from 'isolate-hooks'
import { useEffect, useState } from 'react'
import { nodeTree, NodeTree } from './nodeTree'
import { IsolateComponent } from './types/IsolateComponent'
import { IsolatedComponent } from './types/IsolatedComponent'
import { Selector } from './types/Selector'

type Contexts = { contextType: React.Context<any>; contextValue: any }[]
type RenderMethod<P> = (props: P) => any

const getRenderMethod = <P>(t: any): RenderMethod<P> => {
  let proto = t.prototype
  if (proto?.isReactComponent) {
    const instance = new t()

    let first = true
    let lastResult: any = null

    return (props: P) => {
      const [componentState, setComponentState] = useState(instance.state)

      instance.setState = (s: any) => {
        if (typeof s === 'function') throw new Error('not yet implemented')
        const nextState = { ...componentState, ...s }
        setComponentState(nextState)
      }
      const shouldRender =
        !!instance.shouldComponentUpdate && !first
          ? instance.shouldComponentUpdate(props, componentState)
          : true

      instance.props = props
      instance.state = componentState

      useEffect(() => {
        if (instance.componentDidMount) {
          instance.componentDidMount()
        }
        return () => {
          if (instance.componentWillUnmount) {
            instance.componentWillUnmount()
          }
        }
      }, [])

      if (shouldRender) {
        lastResult = instance.render()
        if (instance.componentDidUpdate && !first) instance.componentDidUpdate()
      }

      first = false
      return lastResult
    }
  }

  return t
}

const isolateComponent_ = <P>(
  contexts: Contexts,
  componentElement: React.ReactElement<P, any>
): IsolatedComponent<P> => {
  let lastResult: React.ReactNode
  let props = componentElement.props
  let tree: NodeTree

  const renderMethod = getRenderMethod<P>(componentElement.type)

  const render = isolateHooks(() => {
    lastResult = renderMethod(props)
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
