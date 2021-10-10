import { ComponentNode } from './ComponentNode'
import { Selector } from './Selector'

export interface QueryableNode {
  /**
   * Find all child nodes that match.
   *
   * @param selector string or component
   * @returns - all matching nodes in the tree, or an empty array if none match
   *
   * @example <caption>Find all elements with matching tag name</caption>
   *
   * ```js
   * const MyList = () => (
   *   <ul>
   *     <li id="1">Arthur</li>
   *     <li id="2">Trillian</li>
   *   </ul>
   * )
   * const isolated = isolateComponent(<MyList/>)
   * const listItems = isolated.findAll('li')
   * console.log(listItems[0].content()) // => 'Arthur'
   * console.log(listItems[1].content()) // => 'Trillian'
   * ```
   *
   * See {@link Selector} docs for all supported selctor syntax.
   */
  findAll(selector?: Selector): ComponentNode[]
  /**
   * Find a single child node that matches, and throw if not found.
   *
   * @param selector string or component
   * @returns - the matching node
   * @throws - if no matching node found
   *
   * @example <caption>Find element by id</caption>
   *
   * ```js
   * const MyList = () => (
   *   <ul>
   *     <li id="1">Arthur</li>
   *     <li id="2">Trillian</li>
   *   </ul>
   * )
   * const isolated = isolateComponent(<MyList/>)
   * const listItem1 = isolated.findOne('#1')
   *
   * console.log(listItem1.content()) // => 'Arthur'
   *
   * // this will throw an error because there are two matches
   * const listItem1 = isolated.findOne('li')
   *
   * // this will throw an error because there are no matches
   * const listItem1 = isolated.findOne('div')
   * ```
   * See {@link Selector} docs for all supported selctor syntax.
   */
  findOne(selector?: Selector): ComponentNode

  /**
   * Check for the existence of any html elements or react components matching the selector.
   *
   * @example <caption>Find element by id</caption>
   *
   * ```js
   * const MyList = () => (
   *   <ul>
   *     <li id="1">Arthur</li>
   *     <li id="2">Trillian</li>
   *   </ul>
   * )
   * const isolated = isolateComponent(<MyList/>)
   *
   * console.log(isolated.exists('li#1')) // => true
   * console.log(isolated.exists('span')) // => false
   * console.log(isolated.exists('ul')) // => true
   * console.log(isolated.exists('li')) // => true
   * ```
   *
   * See {@link Selector} docs for all supported selctor syntax.
   */
  exists(selector?: Selector): boolean
}
