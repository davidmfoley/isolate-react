---
title: Overview
---

`isolateHook` lets you test your custom react hooks quickly and simply.

Here's a simple example: 

```javascript
import { useState } from 'react'
import { isolateHook } from 'isolate-react'

const useCounter = () => {
  const [count, setCount] = useState(0)

  return {
    count,
    increment: () => setCount(x => x + 1)
  }
}

// isolateHook returns a function with the same arguments 
// and return type as the passed hook
const isolated = isolateHook(useCounter)

console.log(isolated().count) // => 0

isolated().increment()

console.log(isolated().count) // => 1

// isolated hooks have some other helper methods:
console.log(isolated.currentValue().count) // => 1
```

For more details see the [isolateHook API Documentation](./api.md)


