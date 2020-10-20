import isolateHooks from 'isolate-hooks'
import { nodeTree, NodeTree, TreeNode } from './nodeTree'
import nodeMatcher, { Selector } from './nodeMatcher'
export { TreeNode, Selector }

/**
 * Return value from isolateComponent.
 *
 * Allows exploring the component's children, changing its props, and
 * otherwise testing its behavior.
 *
 *
 * @interface
 * @typeparam P - Type of the component's props
 */
export interface IsolatedComponent<P> {
  /**
   * Find all child nodes that match.
   * @param spec string or component
   * @returns - all matching nodes in the tree, or an empty array if none match
   */
  findAll(spec?: Selector): TreeNode[]
  /**
   * Find a single child node that matches, and throw if not found.
   * @param spec string or component
   * @returns - the matching node
   * @throws - if no matching node found
   *
   */
  findOne(spec?: Selector): TreeNode

  /**
   * Check for the existence of any html elements or react components matching the selector.
   * @param spec string or component selector
   * @returns - true if any matching nodes, else false
   *
   */
  exists(spec?: Selector): boolean

  /**
   * Set a subset of props, and re-render the component under test
   * @param props - A partial set of props. Unspecified props will not be changed.
   * @example
   * ```js
   * const component = isolateComponent(
   *   <MyComponent someProp="value" otherProp="another value/>
   * )
   *
   * component.mergeProps({
   *   someProp: 'updated value'
   * })
   * // otherProp is unchanged
   * ```
   *
   */
  mergeProps(props: Partial<P>): void
  /**
   * Replace all props, and re-render the component under test
   * @param props - New props. Replaces existing props.
   *
   * @example
   * ```js
   * const component = isolateComponent(
   *   <MyComponent someProp="value" otherProp="another value/>
   * )
   * component.setProps({
   *   someProp: 'updated value',
   *   otherProps: 'yet another value'
   * })
   * ```
   *
   */
  setProps(props: P): void
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
   *   <MyComponent someProp="value" otherProp="another value />
   * )
   *
   * component.cleanup()
   * ```
   */
  cleanup(): void
}

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

type Contexts = { contextType: React.Context<any>; contextValue: any }[]

const isolateComponent_ = <P>(
  contexts: Contexts,
  componentElement: React.ReactElement<P, any>
): IsolatedComponent<P> => {
  let lastResult: React.ReactNode
  let props = componentElement.props
  let tree: NodeTree

  const render = isolateHooks(() => {
    lastResult = componentElement.type(props)
    tree = nodeTree(lastResult)
  })

  contexts.forEach(({ contextType, contextValue }) => {
    render.setContext(contextType, contextValue)
  })

  render()

  return {
    findAll: (spec?: Selector) => {
      return tree.filter(nodeMatcher(spec))
    },
    findOne: (spec?: Selector) => {
      const found = tree.filter(nodeMatcher(spec))
      if (found.length === 0)
        throw new Error(`Could not find element matching ${spec}`)
      if (found.length > 1)
        throw new Error(
          `Expected one element matching ${spec} but found ${found.length}`
        )
      return found[0]
    },
    exists: (spec: Selector) => tree.filter(nodeMatcher(spec)).length > 0,
    mergeProps: (propsToMerge: Partial<P>) => {
      props = { ...props, ...propsToMerge }
      render()
    },
    setProps: (nextProps: P) => {
      props = nextProps
      render()
    },
    content: () => tree.root().content(),
    toString: () => tree.root().toString(),
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
 * Isolate a component for testing
 *
 * These docs are a work in progress -- the typescript-based doc tool is confused by a function that also has properties. Therefore the docs for this are here: {@link IsolateComponent} in the meantime.
 **/
export const isolateComponent: IsolateComponent = isolateComponentWithContext(
  []
)
