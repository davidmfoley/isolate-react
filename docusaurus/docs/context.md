---
id: context
title: Context
---

# Usage with useContext

## withContext()

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

## setContext()

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

