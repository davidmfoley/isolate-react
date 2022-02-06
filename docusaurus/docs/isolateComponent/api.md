---
title: isolateComponent API
---


## isolateComponent

`isolateComponent` accepts React elements, usually rendered with JSX, and returns an [IsolatedComponent](#isolatedcomponent)


Import isolateComponent:

```javascript
import { isolateComponent } from 'isolate-react'
```

Isolate a component:

```javascript
const Hello = (props) => <div>Hello {props.name}</div>

const isolated = isolateComponent(<Hello name="Arthur" />)
```


## IsolatedComponent

`IsolatedComponent` is the return type of [isolateComponent](#isolatecomponent). It provides methods for exploring and manipulating the isolated component.

### mergeProps(partialProps)

Set a subset of props, and re-render the component under test.

```javascript
const Hello = (props) => <div>Hello {props.name}</div>

const isolated = isolateComponent(<Hello name="Arthur" />)

isolated.mergeProps({name: 
```

### setProps(newProps)

Replace all props, and re-render the component under test

### content()

Returns a string representation of the component's content.

### toString()

Returns a string representation of the component's content.

### cleanup()

Cleans up the component and runs all effect cleanups (functions returned by useEffect handlers).
This is equivalent to unmounting a component/removing it from the tree.

### setContext

Set a context value.

Useful when testing a component that uses `useContext`

### inline(selector)

Finds all components that match the given [Selector](#selector) and inlines them, incorporating them into the rendered output.
Allows for testing some or all of the child components rendered by the isolated component together.

### findAll(selector)

Find all nodes that match the given [Selector](#selector).

Returns an array of [ComponentNodes](#componentnode).


### findOne(selector)

Find a single child node that matches the given [Selector](#selector).

Returns a [ComponentNode](#componentnode) if and only if there is a single matching node.

Throws an Error if there are zero or multiple matching nodes.

### exists(selector)

Check for the existence of any html elements or react components matching the selector.
Returns true if any found, false if none found.

## Selector

`Selectors` are used with the methods `findOne`, `findAll`, `exists`, and `inline` to match child nodes.

`Selector` can be either a string or a component function.

### Selector strings
Selector strings support a subset of css-like matching, including matching id or class names and some matching of arbitrary properties.

* Find by tag:

`button` will match any `<button>` tags

* Find by id:

`div#awesome-id` and `#awesome-id` will find `<div id='awesome' />`

* Find by className:

`span.cool` and `.cool` will each find `<span className='cool' />`m

* Find by a matching prop:

`[data-test-id=foobar]` will find the react element or html element with a `data-test-id` prop with the value `foobar`

* Find a react component by name:

`MyComponent` will match a react component with a [displayName](https://reactjs.org/docs/react-component.html#displayname) of "MyComponent"

### React component as selector

You can use a react component function as a selector


## ComponentNode

The methods `findOne` and `findAll` on an isolated component return `ComponentNodes`. 

A `ComponentNode` is a single node that was found within the rendered elements of an isolated component. It offers methods for inspecting its content and props.


### content()

Returns the inner content of the node.

### toString()

Returns the outer content of the node.

### props

Provides access to the props that were used on the latest render. 

### findAll, findOne, exists

These methods work the same as the equivalent methods on [IsolatedComponent](#isolatedcomponent), scoped to the children of the ComponentNode.

##### Typescript note

Depending on the Selector that was used, access to `props` may be typesafe.

If a component function was used as a selector, the type of `props` will match the props of that component. If a string selector was used, the props willl be untyped (any).

