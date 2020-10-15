## isolate-components
[![npm badge](https://img.shields.io/npm/v/isolate-components)](https://npmjs.com/package/isolate-components)

Isolate and test your modern react components without the need for DOM emulators and with support for hooks.

### Installation

`yarn add --dev isolate-components` or `npm install -D isolate-components`

### Usage

See [API documentation](https://davidmfoley.github.io/isolate-components/globals.html#isolatecomponent).

```
import { isolateComponent } from 'isolate-components'

// the component we are going to test
const MyComponent = (props) => (
  <span>Hello {props.name}</span>
)

// render the component, in isolation
const component = isolateComponent(<MyComponent name='Trillian' />)
console.log(component.findOne('span').content()) // => 'Hello Trillian'

// now update the props
component.setProps({name: 'Zaphod'})
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
  .withContext(AnswerContext, 42)
  (<DisplayQuestionAndAnswer />)

console.log(isolated.toString()) // => <div>what is the answer? 42</div>
```


### Usage with hooks

Hooks are supported, including useEffect:

```js

// Component with effect
const ExampleWithHooks = (props) => {
  useEffect(() => {
    console.log(`Hello ${props.name}`)
    // cleanup function
    return () => {
      console.log(`Goodbye ${props.name}`)
    }
  }, [props.name])
  return (
    <span>Hello {props.name}</span>
  )
}

// render the component, in isolation
const component = isolateComponent(<MyComponent name='Trillian' />)
// logs: "Hello Trillian"

component.setProps({name: 'Zaphod'})
//logs: "Goodbye Trillian" (effect cleanup)
//logs: "Hello Zaphod" (effect runs because name prop has changed)

component.cleanup()
//logs: "Goodbye Zaphod"
```


### Isolated component API

An isolated component has some methods to help exercise and inspect it.

Docs for those methods lives here: [Isolated component API docs](https://davidmfoley.github.io/isolate-components/interfaces/isolatedcomponent.html)

### Project progress

This is a new project -- your feature requests and feedback are appreciated.

See the [project tracker](https://github.com/davidmfoley/isolate-components/projects/1) for project progress.

File an [issue](https://github.com/davidmfoley/isolate-components/issues) if you have a suggestion or request.

