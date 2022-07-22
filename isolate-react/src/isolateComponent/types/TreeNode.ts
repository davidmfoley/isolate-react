import { ComponentInstance } from './ComponentInstance'
import { InputNode } from './InputNode'
import { NodeContent } from './NodeContent'

export interface TreeNode<Props = any> extends NodeContent {
  /**
   * The type of node: a react component, html, string or null.
   */
  nodeType:
    | 'react'
    | 'html'
    | 'string'
    | 'number'
    | 'nothing'
    | 'fragment'
    | 'isolated'
    | 'function'
    | 'invalid'
  /**
   * For html elements, the tag name
   * For a react FC, the display name
   * otherwise empty
   */
  name: string
  componentInstance?: ComponentInstance<any>
  /**
   * The `type` as returned from React.createElement
   * For a react FC, the component function.
   * For an html node, the tag name.
   * For a string, the string.
   */
  type: InputNode['type'] | Function
  key?: string
  /**
   * Children, if present, or else an empty array
   * @hidden
   */
  children: TreeNode[]
  /**
   * React or html props, excluding children.
   */
  props: Props
}
