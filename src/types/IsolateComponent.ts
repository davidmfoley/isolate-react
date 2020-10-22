import { IsolatedComponent } from './IsolatedComponent'

/**
 *
 * This is the type of the main entry point: isolateComponent()
 *
 * It accepts a React Element that is a modern react component, usually created with JSX, and returns an
 * {@link IsolatedComponent} that provides methods for manipulating and checking
 * the results of rendering that component.
 *
 * @example Quick start
 *
 * ```js
 * import { isolateComponent } from 'isolated-components'
 * const Hello = (props) => <h2>Hello {props.name}</h2>
 * const component = isolateComponent(<Hello name="Zaphod" />)
 *
 * console.log(component.toString()) // => "<h2>Hello Zaphod</h2>"
 * ```
 *
 * `isolateComponent` also exposes the method {@link IsolateComponent.withContext | isolateComponent.withContext} for setting context values for testing.
 *
 *
 * @returns IsolatedComponent - {@link IsolatedComponent}
 * @typeparam Props - Type of the component's props
 */
export interface IsolateComponent {
  /**
   * @hidden
   **/
  <Props>(componentElement: React.ReactElement<Props, any>): IsolatedComponent<
    Props
  >

  /**
   * Set context values, for testing components that use `useContext`.
   * @param type The context type. This is the return value from React.createContext()
   * @param value The value of the context, to set for testing.
   *
   * Returns a new isolateComponent function that
   * will include the specifed context, making it
   * available to components that use `useContext`.
   *
   * @example <caption>Testing components that use useContext</caption>
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
   *
   * `withContext` can be chained to set multiple context values
   * ```
   */
  withContext: <ContextType>(
    type: React.Context<ContextType>,
    value: ContextType
  ) => IsolateComponent
}
