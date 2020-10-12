export type InputNode = any //ReturnType<typeof React.createElement>

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
export interface TreeNode {
  /**
   * The type of node: a react component, html, string or null.
   */
  nodeType: 'react' | 'html' | 'string' | 'number' | 'null' | 'fragment'
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
  /**
   * Returns the inner content of the node, formatted for debugging
   */
  content(): string | null
  /**
   * Returns the outer content of the node (including its tag and props), formatted for debugging
   */
  toString(): string
}
