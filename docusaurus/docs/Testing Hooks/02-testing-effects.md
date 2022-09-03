---
title: Hooks with effects
---

`isolateHook` supports testing customer hooks that use any of various react effects:

`useEffect`
`useLayoutEffect`
`useInsertionEffect`

Here's a hook that logs when the value of `name` changes:

```javascript
  const useHelloGoodbye = (name) => {
    useEffect(() => {
      console.log(`Hello, ${name}`)
      return () => {console.log(`Goodbye, ${name}`)}
    }, [name])
  }t
```

```javascript
  const useTestHelloGoobye = isolateHook(useHelloGoodbye)

  useTestHelloGoobye('Arthur') // => logs 'Hello Arthur'
  useTestHelloGoobye('Arthur') // => does nothing (no change to effect dependency)
  useTestHelloGoobye('Trillian') // => logs 'Goodbye Arthur' and 'Hello Trillian'
```

## Simulating hook cleanup

You can use the `cleanup` function to simulate the cleanup that happens when a hook is torn down;

```javascript
  const useTestHelloGoobye = isolateHook(useHelloGoodbye)

  useTestHelloGoobye('Arthur') // => logs 'Hello Arthur'
  useTestHelloGoobye('Trillian') // => logs 'Goodbye Arthur' and 'Hello Trillian'
  useTestHelloGoobye.cleanup() // => logs 'Goodbye Trillian'
```

Refer to the [cleanup API docs](./api.md#cleanup) for more information

## Notes

### Effects are executed synchronously

When effect dependencies are changed, all affected effects are executed synchronously *before* the isolated hook returns.

### Testing effects with async functions or promises

Sometimes an effect will have asynchronous behavior, such as fetching some data from a remote api.
In this case you may want to wait for the asynchronous operation to complete before proceeding.

In this case, use the [waitForUpdate](./api#waitForUpdate) method to wait fo the hook to be updated.



