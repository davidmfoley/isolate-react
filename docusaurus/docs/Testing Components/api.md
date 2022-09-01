---
title: API
---


# isolateComponent API

## isolateComponent()

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

# IsolatedComponent

`IsolatedComponent` is the return type of [isolateComponent](#isolatecomponent). It provides methods for exploring and manipulating the isolated component.

## IsolatedComponent: inspect content

### content()

returns the component's *inner* content.

### toString()

returns the component's *outer* content.

```javascript
const Answer = ({ answer }: { answer: number }) => (
  <span>The answer is {answer}</span>
)

const answer = isolateComponent(<Answer answer={42} />)
console.log(answer.content()) // => 'The answer is 42'
console.log(answer.toString()) // => '<span>The answer is 42</span>'
```

## IsolatedComponent: wait for next render

### waitForRender()

Returns a promise that resolves after the next render.

Useful for testing components with asynchronous behavior.

```javascript
const DelayedAnswer = () => {
  // initial value
  const [answer, setAnswer] = useState("unknown")

  // update the value 100 milliseconds later
  useEffect(() => {
    setTimeout(() => { setAnswer("forty-two") }, 100)
  }, [])

  return (
    <span>The answer is {answer}</span>
  )
}

const answer = isolateComponent(<DelayedAnswer />)
console.log(answer.content()) // => 'The answer is unknown'

// wait for the next render
await answer.waitForRender()

console.log(answer.content()) // => 'The answer is forty-two'
```

## IsolatedComponent: find child nodes

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

## IsolatedComponent: inline child components

### inline(selector)

Finds all elements rendered by the isolated component that match the given [Selector](#selector) and inlines them, incorporating them into the rendered output.
Allows for testing some or all of the child components rendered by the isolated component together.

Use the '*' wildcard to inline *all* child elements `inline('*')`.

Important things to know:

- Inlining is recursive. The same inlining rules are 
- An isolated component remembers all inlined selectors for the duration of its existence. If a new element is created that matches any inlined selector, it will also be inlined.

## IsolatedComponent: Update props

These methods both update the props of the component under test. The difference is that mergeProps preserves the props that are not set, while setProps replaces all of the props.

### mergeProps(newProps)

Set a subset of props, and re-render the component under test.

```javascript
const FirstLast = (props) => <div>{props.first} {props.last}</div>

const isolated = isolateComponent(<FirstLast first="Ford" last="Prefect" />)
console.log(isolated.toString())    // => <div>Ford Prefect</div>
isolated.mergeProps({last: Focus})
console.log(isolated.toString())    // => <div>Ford Focus</div>
```

### setProps(newProps)

Replace all props, and re-render the component under test

```javascript
const FirstLast = (props) => <div>{props.first} {props.last}</div>

const isolated = isolateComponent(<FirstLast first="Ford" last="Prefect" />)
console.log(isolated.toString()())    // => <div>Ford Prefect</div>
isolated.setProps({first: 'Arthur', last: 'Dent'})
console.log(isolated.toString()())    // => <div>Arthur Dent</div>
```

### cleanup()

Cleans up the component and runs all effect cleanups (functions returned by useEffect or useLayoutEffect handlers).

This is equivalent to unmounting a component/removing it from the tree.

```javascript

// component that logs 'Goodbye' on unmount:
const Goodbye = () => {
  useEffect(() => {
    return () => { console.log('Goodbye') }
  }, [])

  return <div />
}

const isolated = isolateComponent(<Goodbye />)
isolated.cleanup() // Logs 'Goodbye'
```

### setContext

Set a context value.

Useful when testing a component that uses values from `useContext:`

```javascript
const NameContext = createContext('Zaphod')

const HelloFromContext = () => {
  const name = useContext(NameContext)
  return <div>Hello ${name}</div>
}

const isolated = isolateComponent(<Hello />)
console.log(isolated.toString()())    // => <div>Zaphod</div>

isolated.setContext(NameContext, 'Trillian')
console.log(isolated.toString()())    // => <div>Trillian</div>
```

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

