---
title: Hooks with effects
---

## Simulating hook cleanup

You can use the `cleanup` function to simulate the cleanup that happens when a hook is torn down;


Here's a hook that logs when the value of `name` changes:

```javascript
  const usePrevious = (name) => {
    useEffect(() => {
      console.log(`Hello, ${name}`)
      return () => {console.log(`Goodbye, ${name}`)}
    }, [name])
  }
```

```javascript
  const testUseHelloGoobye
```

Refer to the [cleanup API docs](./api.md#cleanup) for more information
