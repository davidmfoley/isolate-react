/**
 * Spec for finding a child node of a component under test, used with `findOne` and `findAll`.
 *
 * Use a string to find html nodes using a subset of selector syntax:
 *
 * `div#awesome-id` and `#awesome-id` will find `<div id='awesome' />`
 *
 * `span.cool` and `.cool` will each find `<span className='cool' />`m
 *
 * `[data-test-id=foobar]` will find the react element or html element with a `data-test-id` prop with the value `foobar`
 *
 * Use a component function  or name to find react components.
 *
 */
export type Selector = string | React.FC<any>
