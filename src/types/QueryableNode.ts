import { ComponentNode } from './ComponentNode'
import { Selector } from './Selector'

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
