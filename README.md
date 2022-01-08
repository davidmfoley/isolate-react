# isolate-components

[npm](https://npmjs.com/package/isolate-react) | [github](https://github.com/davidmfoley/isolate-react) | [api docs](https://davidmfoley.github.io/isolate-react/api)

## Test-drive react components

### Flexible support for whatever level of testing you prefer:
- [x] Render a single component at a time (isolated/unit testing) 
- [x] Render multiple components toegether (integrated testing)

### Low -friction:
- [x] Works with any test runner that runs in node (jest, mocha, tape, tap, etc.)
- [x] Full hook support
- [x] Easy access to set context values needed for testing.
- [x] No virtual DOM or other tools to install
- [x] Very fast

### Render react components in isolation
- [x] functional components that use hooks
- [x] class components


## Limitations

### Unsupported react features
- [ ] Portals
- [ ] Refs to DOM elements

### Testing without a DOM
Certain things can be hard to test without a DOM: For example, 

### Run your tests

`isolate-components` provides tools for testing your react components. It is not a test runner, nor an assertion library. It will work with any test runner that runs in nodejs like [mocha](https://mochajs.org/) or [jest](https://jestjs.io/) and any assertion library of your choice.

### Test of react hooks outside a component

Want to test your custom hooks? This library doesn't do that, but there is one that does:

If you want to test your custom react hooks outside of the component lifecycle, you should use [isolate-hooks](https://www.npmjs.com/package/isolate-hooks) -- this library is for testing your react functional components that _use_ hooks.

## Why does it exist?

Testing components in isolation should be fast and simple. This library makes it so.

Approaches that require a DOM emulator to test react components will always be slow and indirect. This library enables direct testing of components.

Other options that are fast, such as enzyme's `shallow`, rely on a poorly-maintained shallow renderer that is part of react. This renderer doesn't fully support hooks, so they don't support testing any functional component that uses useEffect or useContext.

Fast, isolated automated testing tools are useful for test-driven development practices.

## How does this compare to (insert tool here)?

### enzyme shallow

Enzyme shallow works great for react class components but doesn't support the full set of hooks necessary to build stateful functional components.

### enzyme mount and react-testing-library

These tools allow testing components that use hooks but they:

1. Require a dom emulator. This makes tests run _very_ slow compared to isolate-components.
1. Require testing _all_ rendered components. This is _sometimes_ desirable but often is not. isolate-components allows you to test a single component in isolation, or to test multiple components together -- it's up to you.

### cypress, selenium, etc.

Cypress and similar tools are used for _acceptance testing_. `isolate-components` facilitates isolated testing of a single component (_unit testing_) or a small set of components. Acceptance testing is orthogonal to unit testing -- you can do either or both.

## Installation

You should probably install this as a dev dependency.

`yarn add --dev isolate-react` or `npm install -D isolate-react`

## Usage

See [API documentation](https://davidmfoley.github.io/isolate-react/globals.html#isolatecomponent).



### Testing effects


```js
import { isolateComponent } from 'isolate-react'

// the component we are going to test
const MyComponent = (props) => <span>Hello {props.name}</span>

// render the component, in isolation
const component = isolateComponent(<MyComponent name="Trillian" />)
console.log(component.findOne('span').content()) // => 'Hello Trillian'

// now update the props
component.setProps({ name: 'Zaphod' })
console.log(component.findOne('span').content()) // => 'Hello Zaphod'
```

### Usage with useContext

#### withContext()

The `withContext` method supports setting context values before render for testing components that use `useContext`.

```js
const QuestionContext = React.createContext('')
const AnswerContext = React.createContext(0)

const DisplayQuestionAndAnswer = () => (
  <div>
    {React.useContext(QuestionContext)} {React.useContext(AnswerContext)}
  </div>
)

const isolated = isolateComponent
  .withContext(QuestionContext, 'what is the answer?')
  .withContext(
    AnswerContext,
    42
  )(<DisplayQuestionAndAnswer />)

console.log(isolated.toString()) // => <div>what is the answer? 42</div>
```

#### setContext()

You can update context values of an isolated component with `.setContext()`:

```js
const QuestionContext = React.createContext('')
const AnswerContext = React.createContext(0)

const DisplayQuestionAndAnswer = () => (
  <div>
    {React.useContext(QuestionContext)} {React.useContext(AnswerContext)}
  </div>
)

const isolated = isolateComponent(<DisplayQuestionAndAnswer />)

isolated.setContext(QuestionContext, 'what is the answer?')
isolated.setContext(AnswerContext, 42)

console.log(isolated.toString()) // => <div>what is the answer? 42</div>
```

### Effects

Easily test components that use `useEffect`.
Use `cleanup()` to test effect cleanup.

```js
import { isolateComponent } from 'isolate-react'

// Component with effect
const EffectExample = (props) => {
  useEffect(() => {
    console.log(`Hello ${props.name}`)
    // cleanup function
    return () => {
      console.log(`Goodbye ${props.name}`)
    }
  }, [props.name])
  return <span>Hello {props.name}</span>
}

// render the component, in isolation
const component = isolateComponent(<EffectExample name="Trillian" />)
// logs: "Hello Trillian"

component.setProps({ name: 'Zaphod' })
//logs: "Goodbye Trillian" (effect cleanup)
//logs: "Hello Zaphod" (effect runs because name prop has changed)

component.cleanup()
//logs: "Goodbye Zaphod"
```

### Isolated component API

An isolated component has some methods to help exercise and inspect it.

See the [API docs](https://davidmfoley.github.io/isolate-react/api)

### Issues & Progress

See the [project tracker](https://github.com/davidmfoley/isolate-react/projects/1) for project progress.

File an [issue](https://github.com/davidmfoley/isolate-react/issues) if you have a suggestion or request.
