# isolate-components

Isolate and test your modern react components with full hooks support and without the need for DOM emulators.

```js
import { isolateComponent } from 'isolate-components'

// Component with effect
const ExampleWithHooks = (props) => {
  useEffect(() => {
    console.log(`Hello ${props.name}`)
    // cleanup function
    return () => {
      console.log(`Goodbye ${props.name}`)
    }
  }, [props.name])
  return <span className="hello">Hello {props.name}</span>
}

// render the component, in isolation
const component = isolateComponent(<MyComponent name="Trillian" />)
// logs: "Hello Trillian"

// explore the rendered components
console.log(component.findOne('span').props.className) // => "hello"
console.log(component.findOne('span.hello').content()) // => "Hello Trillian"
console.log(component.exists('.hello')) // => true
console.log(component.findAll('.hello')) // => array with all matches

component.setProps({ name: 'Zaphod' })
//logs: "Goodbye Trillian" (effect cleanup)
//logs: "Hello Zaphod" (effect runs because name prop has changed)

component.cleanup()
//logs: "Goodbye Zaphod"
```

## Links

[npm](https://npmjs.com/package/isolate-components) | [github](https://github.com/davidmfoley/isolate-components) | [api docs](https://davidmfoley.github.io/isolate-components)

## What does it do?

- Allows unit-testing react functional and class components -- including full support for hooks.
- Runs very fast because there is no DOM emulation.

## What doesn't it do?

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

`yarn add --dev isolate-components` or `npm install -D isolate-components`

## Usage

See [API documentation](https://davidmfoley.github.io/isolate-components/globals.html#isolatecomponent).

```js
import { isolateComponent } from 'isolate-components'

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

You can test components that use `useContext` using the `.withContext()` decorator:

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

You can change context values used by a component with `.setContext()`:

```js
const QuestionContext = React.createContext('')
const AnswerContext = React.createContext(0)

const DisplayQuestionAndAnswer = () => (
  <div>
    {React.useContext(QuestionContext)} {React.useContext(AnswerContext)}
  </div>
)

const isolated = isolateComponent.withContext(
  QuestionContext,
  'what is the answer?'
)(<DisplayQuestionAndAnswer />)

isolated.setContext(AnswerContext, 42)

console.log(isolated.toString()) // => <div>what is the answer? 42</div>
```

### Usage with hooks

Hooks are supported, including useEffect:

```js
import { isolateComponent } from 'isolate-components'

// Component with effect
const ExampleWithHooks = (props) => {
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
const component = isolateComponent(<MyComponent name="Trillian" />)
// logs: "Hello Trillian"

component.setProps({ name: 'Zaphod' })
//logs: "Goodbye Trillian" (effect cleanup)
//logs: "Hello Zaphod" (effect runs because name prop has changed)

component.cleanup()
//logs: "Goodbye Zaphod"
```

### Isolated component API

An isolated component has some methods to help exercise and inspect it.

See the [Isolated component API docs](https://davidmfoley.github.io/isolate-components/interfaces/isolatedcomponent.html)

### Project progress

This is a new project -- your feature requests and feedback are appreciated.

See the [project tracker](https://github.com/davidmfoley/isolate-components/projects/1) for project progress.

File an [issue](https://github.com/davidmfoley/isolate-components/issues) if you have a suggestion or request.
