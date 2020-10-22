import { IsolatedComponent } from './IsolatedComponent'

/**
 * This is the type of the main entry point: isolateComponent
 *
 * isolateCompnent is callable as a function, and also exposes a method `withContext`
 * that returns a new IsolateComponent instance that will set
 * context values for testing.
 *
 * @example <caption>Import like this:</caption>
 *
 * ```js
 * import { isolateComponent } from 'isolate-components'
 * ```
 */
export interface IsolateComponent {
  /**
   * isolateComponent: Isolate a component for testing
   * @param componentElement - A react element, usually created with JSX.
   * @example <caption>Basic usage</caption>
   *
   * ```js
   * const component = isolateComponent(<MyComponent someProp="value" />)
   * ```
   *
   * @returns IsolatedComponent - see the {@link IsolatedCompoenent} docs for more information.
   * @typeparam Props - Type of the component's props
   **/
  <Props>(componentElement: React.ReactElement<Props, any>): IsolatedComponent<
    Props
  >

  /**
   * Set context for isolated components.
   * @param type - The context type. This is the return value from React.createContext()
   * @param value - The value of the context, to set for testing.
   *
   * Returns a new isolateComponent function that
   * will include the specifed context, making it
   * available to components that use `useContext`.
   *
   * @example <caption>set a context value for testing:</caption>
   *
   * ```js
   * const isolatedWithContext = isolateComponent.withContext(MyContext, 'my context value')(<MyComponentThatUsesContext />)
   * ```
   */
  withContext: <ContextType>(
    type: React.Context<ContextType>,
    value: ContextType
  ) => IsolateComponent
}
