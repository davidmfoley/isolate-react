isolate-components

# isolate-components

## Table of contents

### Interfaces

- [ComponentNode](interfaces/ComponentNode.md)
- [IsolateComponent](interfaces/IsolateComponent.md)
- [IsolatedComponent](interfaces/IsolatedComponent.md)

### Type aliases

- [Selector](README.md#selector)

### Variables

- [isolateComponent](README.md#isolatecomponent)

## Entry Point

### isolateComponent

• `Const` **isolateComponent**: [`IsolateComponent`](interfaces/IsolateComponent.md)

isolateComponent: Isolate a component for testing
This function accepts a react element rendering a functional component and returns an [IsolatedComponent](interfaces/IsolatedComponent.md) -- see the linked docs for more information.

**`param`** A react element, usually created with JSX.

**`example`** Import isolateComponent

```js
import { isolateComponent } from 'isolate-components'
```

**`example`** Basic usage

```js
// the component we will isolate for testing
const Hello = (props) => <h2>Hello {props.name}</h2>
const component = isolateComponent(<Hello name="Zaphod" />)

console.log(component.findOne('h2').content()) // => "Hello Zaphod"
console.log(component.toString()) // => "<h2>Hello Zaphod</h2>"
```

**`example`** Test a component that uses useContext.

```js
const NameContext = React.createContext('')

const HelloWithContext = (props) => {
  const name = useContext(NameContext)
  return  <h2>Hello {nameContext.value}</h2>
}

// Use withContext to set the initial value of NameContext:
// withContext can also be chained to set multiple context values (not shown)

const component = isolateComponent.withContext(NameContext, 'Trillian')(<HelloWithContext />)
console.log(component.toString()) // => "<h2>Hello Trillian</h2>"

// Use setContext to update the value:
component.setContext(NameContext, 'Zaphod')(<HelloWithContext />)
console.log(component.toString()) // => "<h2>Hello Zaphod</h2>"

```

**`returns`** IsolatedComponent

**`typeparam`** Type of the component's props

## Querying

### Selector

Ƭ **Selector**: `string` \| `RenderableComponent`

Query for finding a child node of a component under test, used with the finder methods: `exists`, `findOne` and `findAll`.

Use a string to find html nodes using the following syntax:

 Find by id:

`div#awesome-id` and `#awesome-id` will find `<div id='awesome' />`

 Find by className:

`span.cool` and `.cool` will each find `<span className='cool' />`m

 Find by a matching prop:

`[data-test-id=foobar]` will find the react element or html element with a `data-test-id` prop with the value `foobar`

 Find a react component:

 Use a component function or name to find react components.
