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
 * @typeparam Props - Type of the component's props. You probably don't need to worry about this -- just note that if you are using typescript, the methods that set props (mergeProps and setProps) will be typesafe.
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
}
