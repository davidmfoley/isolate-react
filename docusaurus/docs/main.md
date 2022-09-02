---
id: main
title: isolate-react
slug: /
---

## The missing tool for test-driving react hooks and components

* No DOM emulator required
* Supports any test runner
* Zero dependencies
* Simple-to-use
* Guaranteed faster than other react testing tools, or your money back

## Examples/TLDR

### Test a component:

```typescript
// the component we want to test
import React, { useState } from 'react'

const CounterButton = () => {
  const [count, setCount] = useState(0)
  return (
    <div>
      <span className="count">{count}</span>
      <button type="button" onClick={() => setCount(count + 1)}>
        +1
      </button>
    </div>
  )
}

test('starts at zero', () => {
  const counterButton = isolateComponent(<CounterButton />)
  expect(counterButton.findOne('span.count').content()).toEqual('0')
})

test('increments upon click', () => {
  const counterButton = isolateComponent(<CounterButton />)

  counterButton.findOne('button').props.onClick()
  expect(counterButton.findOne('span.count').content()).toEqual('1')
})
```

### Test a hook

```typescript

const useRememberNames = (name: string) => {
  const [names, setNames] = useState([name])

  // when name changes,
  // add it to our list of names,
  // if we haven't seen it yet
  useEffect(() => {
    if (!names.includes(name)) {
      names.push(name)
    }
  }, [name])

  return names
}

test('remembers the initial name', () => {
  const useTestRememberNames = isolateHook(useRememberNames)
  expect(useTestRememberNames('Arthur')).toEqual(['Arthur'])
})

test('remembers two names', () => {
  const useTestRememberNames = isolateHook(useRememberNames)
  useTestRememberNames('Arthur')
  expect(useTestRememberNames('Trillian')).toEqual(['Arthur', 'Trillian'])
})

test('does not remember duplicate names', () => {
  const useTestRememberNames = isolateHook(useRememberNames)
  useTestRememberNames('Ford')
  useTestRememberNames('Arthur')
  useTestRememberNames('Ford')

  expect(useTestRememberNames('Arthur')).toEqual(['Ford', 'Arthur'])
})
```


## Why use isolate-react?

### Flexible support for whatever level of testing you prefer:
- [x] Test custom hooks
- [x] Render a single component at a time (isolated/unit testing) 
- [x] Render multiple components together (integrated testing)

### Low-friction:
- [x] Works with any test runner that runs in node (jest, mocha, tape, tap, etc.)
- [x] Full hook support
- [x] Easy access to set context values needed for testing
- [x] No virtual DOM or other tools to install
- [x] Very fast


See the [API documentation](./api.md) for usage, or jump right into the documentation:
* [isolateComponent](./Testing Components/02-isolateComponent.md) 
* [isolateComponentTree](./Testing Components/03-isolateComponentTree.md) 
* [isolateHook](./Testing Hooks/01-overview.md)

### Issues & Progress

See the [project tracker](https://github.com/davidmfoley/isolate-react/projects/1) for project progress.

File an [issue](https://github.com/davidmfoley/isolate-react/issues) if you have a suggestion or request.
