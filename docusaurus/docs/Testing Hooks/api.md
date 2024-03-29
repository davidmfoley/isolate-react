---
title: API
---

## isolateHook(hookToIsolate)

`isolateHook` accepts a hook and returns an [IsolatedHook](#isolatedhook).


Import `isolateHook`:

```javascript
import { isolateHook } from 'isolate-react'
```

Isolate a hook:

```javascript
const useCounter = () => {
  const [count, setCount] = useState(0)

  return {
    count,
    increment: () => setCount(x => x + 1)
  }
}

const isolated = isolateHook(useCounter)

console.log(isolated()) // => 0
```


## IsolatedHook
An `IsolatedHook` is returned by [isolateHook](#isolatehook).

It is a function that wraps the hook -- so it accepts the same parameters that the hook function accepts:

```javascript
const useHello = (name: string) => `Hello ${name}`

const testHello = isolateHook(useHello)

// testHello takes the same parameters as useHello
console.log(testHello("Trillian")) // => Hello Trillian
```

### IsolatedHook: Typescript type declaration
Sometimes it is convenient to initialize the isolated hook separately from its declaration.

If you're using typescript, type that declaration like this:

```typescript
let testHello: IsolatedHook<typeof useHello>

// ... 

testHello = isolateHook(useHello)
```

## Helper methods

An isolated hook has some helper methods that are useful when testing hook loigc:


### currentValue()
Returns the return value from the last invocation of the hook. Does not execute the hook function.

```javascript
const useHello = (name: string) => `Hello ${name}`

const testHello = isolateHook(useHello)
testHello("Trillian")

console.log(testHello.currentValue()) // Hello Trillian
```

### cleanup()

Cleans up the hook by running any effect cleanup functions returned from useEffect or useLayoutEffect.

```javascript
const useHelloGoodbye = () => {
  useEffect(() => {
    console.log('Hello')
    return () => { console.log('Goodbye') }
  }, [])
}

const testHelloAndGoodbye = isolateHook(useHelloAndGoodbye)

testHelloAndGoodbye() // Logs 'Hello'
testHelloAndGoodbye.cleanup() // Logs 'Goodbye'
```

### invoke() 

Re-executes the hook function, with the parameters from the most recent invocation.

```javascript
const useLogHello = (name: string) => {
  console.log(`Hello ${name}`)
}

const testLogHello = isolateHook(useLogHello)

testLogHello('Arthur') // => logs 'Hello Arthur'
testLogHello.invoke() // => logs 'Hello Arthur'

```

### waitForUpdate()

Returns a promise that resolves with the next value of the hook after it is executed.

Useful for testing hooks with asynchronous behavior.

```javascript
const useDelayedAnswer = () => {
  // initial value
  const [answer, setAnswer] = useState("unknown")

  // update the value 100 milliseconds later
  useEffect(() => {
    setTimeout(() => { setAnswer("forty-two") }, 100)
  }, [])

  return answer
}

const testDelayedAnswer = isolateHook(useDelayedAnswer)
console.log(testDelayedAnswer()) // => 'unknown'

// wait for the next invocation of the hook
const updated = await testDelayedAnswer.waitForUpdate()

console.log(updated) // => 'forty-two'
console.log(testDelayedAnswer.currentValue()) // => 'forty-two'

```

### setContext(ContextType, value)

Sets a context value used by the hook and executes the hook, if necessary. 

Note that the hook will not be executed if it does not use the specified context.

```javascript
const NameContext = createContext('Zaphod')

const useHelloContext = () => {
  const name = useContext(NameContext)
  return `Hello ${name}`
}

const testHelloContext = isolateHook(useHelloContext)

console.log(testHelloContext()) // => Hello Zaphod

testHelloContext.setContext(NameContext, 'Trillian')

console.log(testHelloContext()) // => Hello Trillian
```

### setRef(index, value)

Sets the value of a ref. *Does not* execute the hook function.

```javascript
const useHelloRef = () => {
  const name = useRef('Ford').current
  return `Hello ${name}`
}

const testHelloRef = isolateHook(useHelloRef)

console.log(testHelloRef()) // => Hello Ford

// The first argument is the zero-based index of the ref, 
// in order of the calls to useRef within the hook function
testHelloRef.setRef(0, 'Trillian')

console.log(testHelloRef()) // => Hello Trillian
```


