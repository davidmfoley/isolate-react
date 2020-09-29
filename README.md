### isolate-hooks

[on npm](https://www.npmjs.com/package/isolate-hooks)

Isolates your react hooks for fast and predictable unit-testing.

### Why do I need this?

React hooks offer an idiomatic and convenient way to manage react side effects and state, but can be difficult to test.

This package makes it easy to unit test hooks that are composed from other hooks, with tests that run predictably and fast.

## Install

If you are using this for testing, you probably want to install isolateHooks as a devDependency.

With yarn:

```
yarn add isolated-hooks --dev
```

or with npm:

```
npm install --save-dev
```

## Basic Usage

```
import isolateHooks from 'isolate-hooks'

const isolated = isolateHooks(useSomeHook)

```

#### Options

Context values can set - useful for testing hooks that use useContext (see below)

```
const isolated = isolatehooks(usesomehook, { context: [...}})
```

### API

'isolateHooks' invokes the hook and returns a function that returns the current state when invoked:

```
import isolateHooks from 'isolate-hooks'

const isolated = isolateHooks(useSomeHook)
const hookValue = isolated()
```

The isolated hook is not invoked each time -- it is only invoked when its state changes in response to an effect.

Additionally, an isolated hook offers the following methods:

### `cleanup()`

"Unmounts" the hook and runs all associated cleanup code from effects.

```
import isolateHooks from 'isolate-hooks'

const isolated = isolateHooks(useSomeHook)
isolated.cleanup()
```

### `invoke()`

Forces an invocation of the hook.
This is useful when testing useRef, since updating a ref will not trigger an invocation of the hook.

### `setRef(index: number, value: any)`

Updates the current value of a ref used (via useRef) in the hook for testing purposes.
The index is 0 for the first useRef in the hook, 1 for the second, etc.

### `currentValue()`

Returns the value from the most recent invocation of the hook -- this is the same as invoking the function returned by isolateHooks.
If you prefer not to mix functions and objects, use this.

```
import isolateHooks from 'isolate-hooks'

const isolated = isolateHooks(useSomeHook)

// the following two lines are equivalent
console.log(isolated())
console.log(isolated.currentValue())
```

## Supported hooks

If you have a problem with any particular hook, please submit an issue!

#### useCallback and useMemo

Should work as you expect

#### useState and useReducer

These should work as you expect.
Note that state changes are immediate and synchronous.

#### useContext

You can specify context values in the optional `options` argument, as follows:

```
const ExampleContext = React.createContext(0)
const useContextExample = () => useContext(ExampleContext)

const isolated = isolateHook(() => useContextExample, {
  context: [
    {
      type: ExampleContext,
      value: 42
    }
  ]
})

console.log(isolated()) // => 42

```

#### useEffect and useLayoutEffect

Since there is no "render" phase, effects triggered by useEffect and useLayoutEffect are run synchronously after each invocation.

Layout effects run first, followed by other effects.

When `.cleanup()` is called, all useLayoutEfect effects are cleaned up in the order they were defined, followed by all useEffect effects.

#### useRef

You can set ref `current` using `setRef`. It takes a zero-based index and a value:

```
const useRefExample = (refValue: string) => {
  const exampleRef = useRef(refValue)
  return exampleRef.current
}
const isolated = isolateHooks(() => useRefExample('arthur'))
isolated.setRef(0, 'ford') // the first argument is the index of the ref (zero-based)
isolated.invoke()
console.log(isolated())
```

#### useDebugValue

Does nothing. In the future this may be used for tracing hook execution.

#### useImperativeHandle

Does nothing. I don't what the case would be for testing hook that uses `useImperativeHandle` in isolation. If you have a use case for this, let me know!
