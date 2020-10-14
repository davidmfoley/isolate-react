import { TreeNode } from './nodeTree'

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

const nodeMatcher = (spec: Selector | null): ((node: TreeNode) => boolean) => {
  if (!spec) return () => true
  if (typeof spec === 'string') {
    if (spec.includes('#')) {
      const [tag, id] = spec.split('#')
      return (node) => (!tag || tag === node.name) && id === node.props.id
    }
    if (spec.includes('.')) {
      const [tag, className] = spec.split('.')
      return (node) =>
        (!tag || tag === node.name) &&
        node.props.className.split(' ').includes(className)
    }

    if (/\[.+\]/.test(spec)) {
      const [name, rest] = spec.split('[')
      const [key, value] = rest.split(']')[0].split('=')
      return (node) =>
        (!name || name === node.name) && node.props[key] === value
    }
  }

  return (node) => node.type === spec || node.name === spec
}

export default nodeMatcher
