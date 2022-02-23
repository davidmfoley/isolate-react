import { QueryableNode } from './QueryableNode'
import { Selector } from './Selector'

/**
 * Return value from isolateComponent.
 *
 * Allows exploring the component's children, changing its props, and
 * otherwise testing its behavior.
 *
 *
 * @interface
 * @typeparam Props - Type of the component's props. This is inferred so you don't set it yourself -- just note that if you are using typescript, the methods that set props (mergeProps and setProps) will be typesafe.
 */
export interface IsolatedComponent<Props> extends QueryableNode {
  /**
   * Set a subset of props, and re-render the component under test
   * @param props - A partial set of props. Unspecified props will not be changed.
   * @example
   * ```js
   * const component = isolateComponent(
   *   <MyComponent someProp="value" otherProp="another value" />
   * )
   *
   * component.mergeProps({
   *   someProp: 'updated value'
   * })
   * // otherProp is unchanged
   * ```
   *
   */
  mergeProps(props: Partial<Props>): void

  /**
   * Set a context value and triggers rendering of components that depend on it.
   *
   * Useful when testing a component that uses `useContext`
   *
   * @param type - A React.Context -- this is the value returned from React.createContext().
   * @param value - The value of the context to set
   */
  setContext: <T>(type: React.Context<T>, value: T) => void

  /**
   * Set a context value and triggers rendering of components that depend on it.
   *
   * Useful when testing a component that uses `useContext`
   *
   * @param type - A React.Context -- this is the value returned from React.createContext().
   * @param value - The value of the context to set
   */

  /**
   * Set the current value of a ref
   * @param index The zero-based index of the ref (zero for the first useRef, one for the second, etc.)
   * @param value Value to set.
   */
  setRef: (index: number, value?: any) => void

  /**
   * Replace all props, and re-render the component under test
   * @param props - New props. Replaces existing props.
   *
   * @example
   * ```js
   * const component = isolateComponent(
   *   <MyComponent someProp="value" otherProp="another value" />
   * )
   * component.setProps({
   *   someProp: 'updated value',
   *   otherProps: 'yet another value'
   * })
   * ```
   *
   */
  setProps(props: Props): void
  /**
   * Returns the content of the component.
   * If the component returned null, this is null, otherwise it is a string representation of the content.
   */
  content(): null | string
  /**
   * Returns a string representation of the component and all children, useful for debugging.
   */
  toString(): string
  /**
   * Cleans up the component and runs all effect cleanups (functions returned by useEffect handlers).
   *
   * @example
   * ```js
   * const component = isolateComponent(
   *   <MyComponent someProp="value" otherProp="another value"  />
   * )
   *
   * component.cleanup()
   * ```
   */
  cleanup(): void

  /**
   * "Inline" components to include them rendered output rather than making them available.
   *  Allows for testing multiple components.
   *
   * Inline all components of a certain type:
   *
   * `isolated.inline(ListItem)`
   *
   * The display name of the component can also be used:
   *
   * `isolated.inline('ListItem')`
   *
   * Include *all* components by passing "*":
   *
   * `isolated.inline('*')`
   *
   */
  inline(selector: Selector): void
  debug: () => string
}
