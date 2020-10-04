### isolate-hooks

Isolates your react hooks for fast and predictable unit-testing.

### Why do I need this?

[npm](https://www.npmjs.com/package/isolate-hooks)

React hooks offer an idiomatic and convenient way to manage react side effects and state, but can be difficult to test.

This package makes it easy to unit test hooks that are composed from other hooks, with tests that run predictably and fast.

## Install

If you are using this for testing, you probably want to install `isolate-hooks` as a devDependency.

With yarn:

```
yarn add isolated-hooks --dev
```

or with npm:

```
npm install --save-dev
```

## Usage

```
import isolateHooks from 'isolate-hooks'

const isolated = isolateHooks(useSomeHook)

// log the current value returned by the hook
console.log(isolated())

```


### API

'isolateHooks' takes a hook function and returns a function with the same signature that is "isolated" with local state,
similar to how it would behave if invoked inside a react function component.


```
import isolateHooks from 'isolate-hooks'

const useCounter = () => {
  const [count, setCount] = useState(0)
  return [ count, () => setCount(count => count+1)]
}

const isolated = isolateHooks(useCounter)
const [count, increment] = isolated()


console.log(count) // => 0

increment()

const [updatedCount] = isolated()

console.log(updatedCount) // => 1

```

Hooks that take parameters can also be isolated:

```
const useHelloGoodbye = (name) => {
  useEffect(() => {
    console.log(`hello ${name}`)
    return () => {
      console.log(`goodbye ${name}`)
    }
  }, [name])
}

const isolatedHelloGoodbye = isolateHooks(useHelloGoodbye)
isolatedHelloGoodbye('arthur'

```


Additionally, an isolated hook offers the following methods:

### `cleanup()`

"Unmounts" the hook and runs all associated cleanup code from effects.

```
import isolateHooks from 'isolate-hooks'

const useCleanupExample = () => {
  useEffect(
    () => {
      console.log('mount')
      return () => { console.log('unmount') }
    }, [])
}

const isolated = isolateHooks(useSomeHook)
// => 'mount'

isolated.cleanup()
// => 'unmout'

```

### `invoke()`

Forces an invocation of the hook with the last set of arguments.
This is useful when testing useRef, since updating a ref will not trigger an invocation of the hook.

### `setContext<T>(type: React.Context<T>, value: T)`

Set a context value that will be exposed in the isolated hook via `useContext`.

### `setRef(index: number, value: any)`

Updates the current value of a ref used (via useRef) in the hook for testing purposes.
The index is 0 for the first useRef in the hook, 1 for the second, etc.

### `currentValue()`

Returns the value from the most recent invocation of the hook.

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
