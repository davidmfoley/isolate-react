import { IsolateComponent } from './types/IsolateComponent'
import { IsolatedComponent } from './types/IsolatedComponent'
import { ComponentInstance } from './types/ComponentInstance'
import { Selector } from './types/Selector'
import { Contexts, isolatedRenderer } from './isolatedRenderer'
import { RenderableComponent } from './types/RenderableComponent'
import { makeRenderContext } from './isolatedRenderer/renderContext'

const isolateComponent_ = <P>(
  contexts: Contexts,
  componentElement: React.ReactElement<P, any>
): IsolatedComponent<P> => {
  const renderer = isolatedRenderer(makeRenderContext(contexts))
  const instance: ComponentInstance<P> = renderer.render(
    componentElement.type,
    componentElement.props
  )

  return {
    findAll: (spec?: Selector) => instance.tree().findAll(spec),
    findOne: (spec?: Selector) => instance.tree().findOne(spec),
    exists: (spec: Selector) => instance.tree().exists(spec),
    mergeProps: instance.mergeProps,
    setProps: instance.setProps,
    setContext: instance.setContext,
    content: () => instance.tree().content(),
    toString: () => instance.tree().toString(),
    debug: () => instance.tree().debug(),
    cleanup: instance.cleanup,
    inline: (selector?: RenderableComponent) => instance.inlineAll(selector),
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
 * This function accepts a react element rendering a functional component and returns an {@link IsolatedComponent}.
 *
 * @param componentElement A react element, usually created with JSX.
 *
 * @example Import isolateComponent
 *
 * ```js
 * import { isolateComponent } from 'isolate-components'
 * ```
 *
 * @example Basic usage
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
 * @example Test a component that uses useContext.
 *
 * ```js
 * const NameContext = React.createContext('')
 *
 * const HelloWithContext = (props) => {
 *   const name = useContext(NameContext)
 *   return  <h2>Hello {nameContext.value}</h2>
 * }
 *
 * // Use withContext to set the initial value of NameContext:
 * // withContext can also be chained to set multiple context values (not shown)
 *
 * const component = isolateComponent.withContext(NameContext, 'Trillian')(<HelloWithContext />)
 * console.log(component.toString()) // => "<h2>Hello Trillian</h2>"
 *
 * // Use setContext to update the value:
 * component.setContext(NameContext, 'Zaphod')(<HelloWithContext />)
 * console.log(component.toString()) // => "<h2>Hello Zaphod</h2>"
 *
 * ```
 *
 *
 * @category Entry Point
 * @returns IsolatedComponent
 * @typeparam Props - Type of the component's props
 **/
export const isolateComponent: IsolateComponent = isolateComponentWithContext(
  []
)
