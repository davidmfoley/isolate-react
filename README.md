# isolate-react

[npm](https://npmjs.com/package/isolate-react) | [github](https://github.com/davidmfoley/isolate-react) | [api docs](https://davidmfoley.github.io/isolate-react/api)

## Test-drive react components and hooks

### Flexible support for whatever level of testing you prefer:
- [x] Test react hooks
- [x] Render a single component at a time (isolated/unit testing) 
- [x] Render multiple components toegether (integrated testing)

### Low -friction:
- [x] No virtual DOM or other tools to install
- [x] Works with any test runner that runs in node (jest, mocha, tape, tap, etc.)
- [x] Full hook support
- [x] Easy access to set context values for testing
- [x] Very fast

### Render react components in isolation
- [x] functional components that use hooks
- [x] class components

## Why does it exist?

Testing components in isolation should be fast and simple. This library makes it so.

Approaches that require a DOM emulator to test react components will always be slow and indirect. This library enables direct testing of components and hooks.

Install `isolate-react` as a dev dependency.

`yarn add --dev isolate-react` or `npm install -D isolate-react`

## Usage

`isolate-react` exports two functions: `isolateHook` and `isolateComponent`. 

Use `isolateHook` [(api docs)](https://davidmfoley.github.io/isolate-react/globals.html#isolatehook)  for testing custom react hooks.

Use `isolateComponent` [(api docs)](https://davidmfoley.github.io/isolate-react/globals.html#isolatecomponent) for testing your react components.


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
