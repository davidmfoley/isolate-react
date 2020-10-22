export type InputNode = any //ReturnType<typeof React.createElement>

export interface NodeContent {
  /**
   * Returns the inner content of the node, formatted for debugging
   */
  content(): string | null
  /**
   * Returns the outer content of the node (including its tag and props), formatted for debugging
   */
  toString(): string
}

export interface TreeNode extends NodeContent {
  /**
   * The type of node: a react component, html, string or null.
   */
  nodeType: 'react' | 'html' | 'string' | 'number' | 'nothing' | 'fragment'
  /**
   * For html elements, the tag name
   * For a react FC, the display name
   * otherwise empty
   */
  name: string
  /**
   * The `type` as returned from React.createElement
   * For a react FC, the component function.
   * For an html node, the tag name.
   * For a string, the string.
   */
  type: InputNode['type']
  /**
   * Children, if present, or else an empty array
   */
  children: TreeNode[]
  /**
   * React or html props, excluding children.
   */
  props: any
}

export type Selector = string | React.FC<any>

export interface QueryableNode {
  /**
   * Find all child nodes that match.
   * @param spec string or component
   * @returns - all matching nodes in the tree, or an empty array if none match
   */
  findAll(spec?: Selector): ComponentNode[]
  /**
   * Find a single child node that matches, and throw if not found.
   * @param spec string or component
   * @returns - the matching node
   * @throws - if no matching node found
   *
   */
  findOne(spec?: Selector): ComponentNode

  /**
   * Check for the existence of any html elements or react components matching the selector.
   * @param spec string or component selector
   * @returns - true if any matching nodes, else false
   *
   */
  exists(spec?: Selector): boolean
}

/**
 * A node -- react component, html element, or string -- that was rendered by the component under test.
 *
 * Useful for getting access to props to assert that they have the correct value, or to trigger handlers like `onClick` or `onChange` to exercise the component.
 *
 * Also provides `toString()` and `content()` helpers for debugging.
 *
 * @interface
 *
 */
export interface ComponentNode extends TreeNode, QueryableNode {}
