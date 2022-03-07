---
title: Test a single component
---

The simplest use of `isolateComponent` is to test a single component in isolation.

In this style of testing we render only the component we are testing, and test its logic.

Let's say we want to create a button that counts how many times it's been clicked and displays that count:

```javascript
import React, { useState } from 'react'

// this is the component we want to test
export const CounterButton = () => {
  const [count, setCount] = useState(0)
  return (
  <div>
    <span className="count">{count}</span>
    <button type='button' onClick= {() => setCount(count => count + 1)}>+1</button>
  </div>
  )
}
```

We can test this by:
1. Isolating the component using `isolateComponent`
2. Looking at the content rendered by the isolated component to see that it is 0.
3. Simulating clicks on the button
4. Checking the content again, as in step 2.

Here's how that would look, using jest as the test runner:

```javascript
import { isolateComponent } from 'isolate-react'
import { CounterButton } from './CounterButton'

test('starts at zero, then increments when clicked', () => {
  // 1. Isolate
  const button = isolateComponent(<CounterButton />)

  // 2. Verify it starts with zero.
  expect(button.content()).toContain('0')

  // 3. Simulate three clicks
  button.findOne('button').props.onClick()
  button.findOne('button').props.onClick()
  button.findOne('button').props.onClick()

  // 4. Verify it is now 3
  expect(button.content()).toContain('3')
})
```


## Step by step:

### Step 1: isolate with `isolateComponent`:
```javascript
  const button = isolateComponent(<CounterButton />)
```

`isolateComponent` returns an IsolatedComponent. Check out [the api documentation](./api.md) for more information.

### Step 2: Verify it starts out with a zero value

There are a few different ways to explore the isolated component's contents. 

`content()` returns all of the inner content of the component:

```javascript
  expect(button.content()).toContain('0')
```

We can also find the rendered `span` and check its content:

```javascript
  // find by element type
  expect(button.findOne('span').content()).toEqual('0')
  // find by className
  expect(button.findOne('.count').content()).toEqual('0')
  // find by element type and class name
  expect(button.findOne('span.count').content()).toEqual('0')
 ```

There are a few other ways to explore the contents of an isolated component. Two of the most useful are `findAll()` and `exists()`

`findOne`, `findAll`, and `exists` each take a [Selector](./api.md). A Selector can be a string that supports a subset of CSS-style matchers. It can also be a component reference, which will be discussed later in this guide.

### Step 3: Simulate interactions

Simulate interactions by using `findOne` or `findAll` to find rendered components or tags (called "nodes") and interacting with their props:

```javascript
  button.findOne('button').props.onClick()
  button.findOne('button').props.onClick()
  button.findOne('button').props.onClick()
```

### Step 4: Verify the updated content

Again, there are a few different ways to do this:

```javascript
  expect(button.content()).toContain('3')

  expect(button.findOne('span.count').content()).toEqual('3')
```
