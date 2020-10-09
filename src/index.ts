import isolateHooks from 'isolate-hooks'
import { nodeTree, NodeTree, TreeNode } from './nodeTree'

type FindSpec = string | React.FC<any>

/*
interface IsolatedNode<P> {
  type: React.FC<P> | string
  props: P
}
*/

/**
 * Return value from isolateComponent
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
  findAll(spec?: FindSpec): TreeNode[]
  /**
   * Find a single child node that matches, and throw if not found.
   * @param spec string or component
   * @returns - the matching node
   * @throws - if no matching node found
   */
  findOne(spec?: FindSpec): TreeNode
  /**
   * Set a subset of props, and re-render the component under test
   * @param props - A partial set of props. Unspecified props will not be changed.
   */
  mergeProps(props: Partial<P>): void
  /**
   * Replace all props, and re-render the component under test
   * @param props - New props. Replaces existing props.
   */
  setProps(props: P): void
}

const allNodes = (e: any) => {
  const children = Array.isArray(e.props.children) ? e.props.children : []
  console.log(';', e, children)
  return [e].concat(children.flatMap(allNodes))
}

/**
 * Isolate a component for testing
 * @param componentElement - A react element, usually created with JSX, like: <MyComponent someProp="value" />
 * @returns IsolatedComponent
 * @typeparam P - Type of the component's props
 **/
export const isolateComponent = <P>(
  componentElement: React.ReactElement<P, any>kk
): IsolatedComponent<P> => {
  let lastResult: React.ReactNode
  let props = componentElement.props
  let tree: NodeTree

  const nodeMatches = (spec: FindSpec | null, node: any) => {
    if (!spec) return true
    return node.type === spec
  }

  const render = isolateHooks(() => {
    lastResult = componentElement.type(props)
    tree = nodeTree(lastResult)
  })

  render()

  return {
    findAll: (spec?: FindSpec) => {
      return tree.filter((n) => nodeMatches(spec, n))
    },
    findOne: (spec?: FindSpec) => {
      const found = tree.find((n) => nodeMatches(spec, n))
      if (!found) throw new Error(`Could not find element matching ${spec}`)
      return found
    },
    mergeProps: (propsToMerge: Partial<P>) => {
      props = { ...props, ...propsToMerge }
      render()
    },
    setProps: (nextProps: P) => {
      props = nextProps
      render()
    },
  }
}
