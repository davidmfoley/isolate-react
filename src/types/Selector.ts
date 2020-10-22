import React from 'react'
/**
 * Query for finding a child node of a component under test, used with the finder methods: `exists`, `findOne` and `findAll`.
 *
 * Use a string to find html nodes using the following syntax:
 *
 *  Find by id:
 *
 * `div#awesome-id` and `#awesome-id` will find `<div id='awesome' />`
 *
 *  Find by className:
 *
 * `span.cool` and `.cool` will each find `<span className='cool' />`m
 *
 *  Find by a matching prop:
 *
 * `[data-test-id=foobar]` will find the react element or html element with a `data-test-id` prop with the value `foobar`
 *
 *
 *  Find a react component:
 *
 *  Use a component function or name to find react components.
 *
 *  @category Querying
 *
 */
export type Selector =
  | string
  | React.FC<any>
  | React.ComponentClass<any, any>
  | React.ClassicComponentClass<any>