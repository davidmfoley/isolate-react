import { describe, it } from 'mocha'
import React from 'react'
import { isolateComponent } from '../../src/isolateComponent'
import assert from 'node:assert'

describe('setting component context', () => {
  const QuestionContext = React.createContext('')
  const AnswerContext = React.createContext(0)

  const DisplayAnswer = () => (
    <div className="answer">{React.useContext(AnswerContext)}</div>
  )

  const DisplayQuestionAndAnswer = () => (
    <div>
      {React.useContext(QuestionContext)} {React.useContext(AnswerContext)}
    </div>
  )

  it('has default context value if none specified', () => {
    const isolated = isolateComponent(<DisplayAnswer />)
    assert.strictEqual(isolated.findOne('div').content(), '0')
  })

  it('can set the context value', () => {
    const isolated = isolateComponent.withContext(
      AnswerContext,
      42
    )(<DisplayAnswer />)
    assert.strictEqual(isolated.findOne('div').content(), '42')
  })

  it('uses last context value if there are multiple defined', () => {
    const isolated = isolateComponent
      .withContext(AnswerContext, 42)
      .withContext(
        AnswerContext,
        3
      )(<DisplayAnswer />)
    assert.strictEqual(isolated.findOne('div').content(), '3')
  })

  it('can set multiple contexts', () => {
    const isolated = isolateComponent
      .withContext(QuestionContext, 'what is the answer?')
      .withContext(
        AnswerContext,
        42
      )(<DisplayQuestionAndAnswer />)
    assert.strictEqual(
      isolated.findOne('div').content(),
      'what is the answer? 42'
    )
  })

  it('rerenders when context is set', () => {
    const isolated = isolateComponent
      .withContext(QuestionContext, 'what is the answer?')
      .withContext(
        AnswerContext,
        42
      )(<DisplayQuestionAndAnswer />)

    isolated.setContext(AnswerContext, 77)

    assert.strictEqual(
      isolated.findOne('div').content(),
      'what is the answer? 77'
    )
  })
})
