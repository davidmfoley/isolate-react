---
title: Overview
---

`isolateHook` lets you test your custom react hooks quickly and simply.

```javascript
import { isolateHook } from 'isolate-react'

const useCounter = () => {
  const [count, setCount] = useState(0)

  return {
    count,
    increment: () => setCount(x => x + 1)
  }
}

const isolated = isolateHook(useCounter)

console.log(isolated().count) // => 0

isolated().increment()

console.log(isolated().count) // => 1
```

For more details see the [isolateHook API Documentation](./api.md)


