import { InputNode } from './InputNode'
import { NodeContent } from './NodeContent'

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
