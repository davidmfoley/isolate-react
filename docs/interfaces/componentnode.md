**[isolate-components](../README.md)**

> [Globals](../globals.md) / ComponentNode

# Interface: ComponentNode

A node -- react component, html element, or string -- that was rendered by the component under test.

Useful for getting access to props to assert that they have the correct value, or to trigger handlers like `onClick` or `onChange` to exercise the component.

Also provides `toString()` and `content()` helpers for debugging.

**`interface`** 

## Hierarchy

* TreeNode

* QueryableNode

  ↳ **ComponentNode**

## Index

### Properties

* [componentInstance](componentnode.md#componentinstance)
* [key](componentnode.md#key)
* [name](componentnode.md#name)
* [nodeType](componentnode.md#nodetype)
* [props](componentnode.md#props)
* [type](componentnode.md#type)

### Methods

* [content](componentnode.md#content)
* [exists](componentnode.md#exists)
* [findAll](componentnode.md#findall)
* [findOne](componentnode.md#findone)
* [toString](componentnode.md#tostring)

## Properties

### componentInstance

• `Optional` **componentInstance**: ComponentInstance\<any>

*Inherited from [ComponentNode](componentnode.md).[componentInstance](componentnode.md#componentinstance)*

___

### key

• `Optional` **key**: string

*Inherited from [ComponentNode](componentnode.md).[key](componentnode.md#key)*

___

### name

•  **name**: string

*Inherited from [ComponentNode](componentnode.md).[name](componentnode.md#name)*

For html elements, the tag name
For a react FC, the display name
otherwise empty

___

### nodeType

•  **nodeType**: \"react\" \| \"html\" \| \"string\" \| \"number\" \| \"nothing\" \| \"fragment\" \| \"isolated\"

*Inherited from [ComponentNode](componentnode.md).[nodeType](componentnode.md#nodetype)*

The type of node: a react component, html, string or null.

___

### props

•  **props**: any

*Inherited from [ComponentNode](componentnode.md).[props](componentnode.md#props)*

React or html props, excluding children.

___

### type

•  **type**: InputNode[\"type\"]

*Inherited from [ComponentNode](componentnode.md).[type](componentnode.md#type)*

The `type` as returned from React.createElement
For a react FC, the component function.
For an html node, the tag name.
For a string, the string.

## Methods

### content

▸ **content**(): string \| null

*Inherited from [ComponentNode](componentnode.md).[content](componentnode.md#content)*

Returns the inner content of the node, formatted for debugging

**Returns:** string \| null

___

### exists

▸ **exists**(`selector?`: [Selector](../globals.md#selector)): boolean

*Inherited from [ComponentNode](componentnode.md).[exists](componentnode.md#exists)*

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

See [Selector](../globals.md#selector) docs for all supported selctor syntax.

#### Parameters:

Name | Type |
------ | ------ |
`selector?` | [Selector](../globals.md#selector) |

**Returns:** boolean

___

### findAll

▸ **findAll**(`selector?`: [Selector](../globals.md#selector)): [ComponentNode](componentnode.md)[]

*Inherited from [ComponentNode](componentnode.md).[findAll](componentnode.md#findall)*

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

See [Selector](../globals.md#selector) docs for all supported selctor syntax.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`selector?` | [Selector](../globals.md#selector) | string or component |

**Returns:** [ComponentNode](componentnode.md)[]

- all matching nodes in the tree, or an empty array if none match

___

### findOne

▸ **findOne**(`selector?`: [Selector](../globals.md#selector)): [ComponentNode](componentnode.md)

*Inherited from [ComponentNode](componentnode.md).[findOne](componentnode.md#findone)*

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
See [Selector](../globals.md#selector) docs for all supported selctor syntax.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`selector?` | [Selector](../globals.md#selector) | string or component |

**Returns:** [ComponentNode](componentnode.md)

- the matching node

___

### toString

▸ **toString**(): string

*Inherited from [ComponentNode](componentnode.md).[toString](componentnode.md#tostring)*

Returns the outer content of the node (including its tag and props), formatted for debugging

**Returns:** string
