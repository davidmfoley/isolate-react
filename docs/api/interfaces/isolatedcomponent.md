[isolate-components](../README.md) / IsolatedComponent

# Interface: IsolatedComponent<Props\>

Return value from isolateComponent.

Allows exploring the component's children, changing its props, and
otherwise testing its behavior.

**`interface`**

## Type parameters

| Name | Description |
| :------ | :------ |
| `Props` | Type of the component's props. You probably don't need to worry about this -- just note that if you are using typescript, the methods that set props (mergeProps and setProps) will be typesafe. |

## Hierarchy

- `QueryableNode`

  ↳ **`IsolatedComponent`**

## Table of contents

### Methods

- [cleanup](IsolatedComponent.md#cleanup)
- [content](IsolatedComponent.md#content)
- [exists](IsolatedComponent.md#exists)
- [findAll](IsolatedComponent.md#findall)
- [findOne](IsolatedComponent.md#findone)
- [inline](IsolatedComponent.md#inline)
- [mergeProps](IsolatedComponent.md#mergeprops)
- [setContext](IsolatedComponent.md#setcontext)
- [setProps](IsolatedComponent.md#setprops)
- [toString](IsolatedComponent.md#tostring)

## Methods

### cleanup

▸ **cleanup**(): `void`

Cleans up the component and runs all effect cleanups (functions returned by useEffect handlers).

**`example`**
```js
const component = isolateComponent(
  <MyComponent someProp="value" otherProp="another value"  />
)

component.cleanup()
```

#### Returns

`void`

___

### content

▸ **content**(): `string`

Returns the content of the component.
If the component returned null, this is null, otherwise it is a string representation of the content.

#### Returns

`string`

___

### exists

▸ **exists**(`selector?`): `boolean`

Check for the existence of any html elements or react components matching the selector.

**`example`** <caption>Find element by id</caption>

```js
const MyList = () => (
  <ul>
    <li id="1">Arthur</li>
    <li id="2">Trillian</li>
  </ul>
)
const isolated = isolateComponent(<MyList/>)

console.log(isolated.exists('li#1')) // => true
console.log(isolated.exists('span')) // => false
console.log(isolated.exists('ul')) // => true
console.log(isolated.exists('li')) // => true
```

See [Selector](../README.md#selector) docs for all supported selctor syntax.

#### Parameters

| Name | Type |
| :------ | :------ |
| `selector?` | [`Selector`](../README.md#selector) |

#### Returns

`boolean`

#### Inherited from

QueryableNode.exists

___

### findAll

▸ **findAll**(`selector?`): [`ComponentNode`](ComponentNode.md)[]

Find all child nodes that match.

**`example`** <caption>Find all elements with matching tag name</caption>

```js
const MyList = () => (
  <ul>
    <li id="1">Arthur</li>
    <li id="2">Trillian</li>
  </ul>
)
const isolated = isolateComponent(<MyList/>)
const listItems = isolated.findAll('li')
console.log(listItems[0].content()) // => 'Arthur'
console.log(listItems[1].content()) // => 'Trillian'
```

See [Selector](../README.md#selector) docs for all supported selctor syntax.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `selector?` | [`Selector`](../README.md#selector) | string or component |

#### Returns

[`ComponentNode`](ComponentNode.md)[]

- all matching nodes in the tree, or an empty array if none match

#### Inherited from

QueryableNode.findAll

___

### findOne

▸ **findOne**(`selector?`): [`ComponentNode`](ComponentNode.md)

Find a single child node that matches, and throw if not found.

**`throws`** - if no matching node found

**`example`** <caption>Find element by id</caption>

```js
const MyList = () => (
  <ul>
    <li id="1">Arthur</li>
    <li id="2">Trillian</li>
  </ul>
)
const isolated = isolateComponent(<MyList/>)
const listItem1 = isolated.findOne('#1')

console.log(listItem1.content()) // => 'Arthur'

// this will throw an error because there are two matches
const listItem1 = isolated.findOne('li')

// this will throw an error because there are no matches
const listItem1 = isolated.findOne('div')
```
See [Selector](../README.md#selector) docs for all supported selctor syntax.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `selector?` | [`Selector`](../README.md#selector) | string or component |

#### Returns

[`ComponentNode`](ComponentNode.md)

- the matching node

#### Inherited from

QueryableNode.findOne

___

### inline

▸ **inline**(`selector`): `void`

"Inline" components to include them rendered output rather than making them available.
 Allows for testing multiple components.

Inline all components of a certain type:

`isolated.inline(ListItem)`

The display name of the component can also be used:

`isolated.inline('ListItem')`

Include *all* components by passing "*":

`isolated.inline('*')`

#### Parameters

| Name | Type |
| :------ | :------ |
| `selector` | [`Selector`](../README.md#selector) |

#### Returns

`void`

___

### mergeProps

▸ **mergeProps**(`props`): `void`

Set a subset of props, and re-render the component under test

**`example`**
```js
const component = isolateComponent(
  <MyComponent someProp="value" otherProp="another value" />
)

component.mergeProps({
  someProp: 'updated value'
})
// otherProp is unchanged
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `props` | `Partial`<`Props`\> | A partial set of props. Unspecified props will not be changed. |

#### Returns

`void`

___

### setContext

▸ **setContext**<`T`\>(`type`, `value`): `void`

Set a context value.

Useful when testing a component that uses `useContext`

**`example`**
```js
const currentUserContext = React.createContext({ id: 0, name: 'unknown' })

const Greeting = () => {
  const currentUser = useContext(currentUserContext)
  return <h2>Hello {currentUser.name}</h2>
}

const component = isolateComponent(
  <Greeting/>
)

component.setContext(
  currentUserContext,
  { id: 42, name: 'arthur' }
})

console.log(component.findOne('h2').content())
// logs: "Hello arthur"

```

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `type` | `Context`<`T`\> | A React.Context -- this is the value returned from React.createContext(). |
| `value` | `T` | - |

#### Returns

`void`

___

### setProps

▸ **setProps**(`props`): `void`

Replace all props, and re-render the component under test

**`example`**
```js
const component = isolateComponent(
  <MyComponent someProp="value" otherProp="another value" />
)
component.setProps({
  someProp: 'updated value',
  otherProps: 'yet another value'
})
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `props` | `Props` | New props. Replaces existing props. |

#### Returns

`void`

___

### toString

▸ **toString**(): `string`

Returns a string representation of the component and all children, useful for debugging.

#### Returns

`string`
