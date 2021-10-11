---
title: Overview
---

`isolateComponent` renders a react component in isolation and gives you a set of tools for testing its behavior. 
 
# TLDR
```javascript
import { isolateComponent } from 'isolate-react'
import React, { useState } from 'react'

// this is the component we want to test
const CounterButton = () => {
  const [count, setCount] = useState(0)
  return (
  <div>
    <span className="count">{count}</span>
    <button type='button' onClick= {() => setCount(count + 1)}>+1</button>
  </div>
  )
}

test('starts at zero', () => {
  const button = isolateComponent(<CounterButton />)
  expect(button.
})
```

 `isolateComponent` 
