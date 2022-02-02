import { QueryableNode } from './QueryableNode'
import { TreeNode } from './TreeNode'

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
export interface ComponentNode<Props = any>
  extends TreeNode<Props>,
    QueryableNode {}
