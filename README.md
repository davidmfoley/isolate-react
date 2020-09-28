###

Isolates your react hooks for fast and predictable testing.

## Basic Usage

```
const isolated = isolateHooks(useSomeHook, options)
console.log(isolated.currentValue())
```

#### Usage with Options

Options can be used to set context values for testing (see useContext note below).

```
const isolated = isolateHooks(useSomeHook, {})
console.log(isolated.currentValue())
```

### API

an isolated hook offers the following methods:

### `currentValue()`

returns the value from the last invocation of the hook

### `cleanup()`

"Unmounts" the hook and runs all associated cleanup code from effects.

### `invoke()`

Forces an invocation of the hook.

### `setRef(index: number, value: any)`

Updates the current value of a ref used (via useRef) in the hook for testing purposes.
The index is 0 for the first useRef in the hook, 1 for the second, etc.

##

### Why use this?

React hooks offer an idiomatic and convenient way to manage react side effects and state, but can be difficult to test.

This package makes it easy to unit test hooks that are composed from other hooks.

## Hook Support

If you have a problem with any particular hook, please submit an issue!

### Fully supported hooks:

#### useCallback

#### useMemo

#### useState

#### useReducer

### Partially supported/supported with caveats:

#### useContext

You can specify context values in the optional `options` argument, as follows:

```
const ExampleContext = React.createContext(0)

const isolatedHook = isolate(() => useContextExample, {
  context: [
    {
      type: ExampleContext,
      value: 42
    }
  ]
})
```

#### useEffect and useLayoutEffect

Since there is no "render" phase, effects triggered by useEffect and useLayoutEffect are run synchronously after each invocation.

Layout effects run first, followed by other effects.

When `.cleanup()` is called, all useLayoutEfect effects are cleaned up in the order they were defined, followed by all useEffect effects.

#### useRef

You can set ref `current` using `setRef`. It takes a zero-based index and a value.

```
const useRefExample = (refValue: string) => {
  const exampleRef = useRef(refValue)
  return exampleRef.current
}
const isolated = isolateHooks(() => useRefExample('arthur'))
isolated.setRef(0, 'ford') // the first argument is the index of the ref (zero-based)
isolated.invoke()
console.log(isolated.currentValue())
```

#### useDebugValue

Does nothing. In the future this may be used for tracing hook execution.

#### useImperativeHandle

Does nothing. I don't what the case would be for testing this in isolation. If you have a use case for this, let me know!
