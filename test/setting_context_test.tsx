import { describe, it } from 'mocha'
import React from 'react'
import { isolateComponent } from '../src'
import { expect } from 'chai'

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
    expect(isolated.findOne('div').content()).to.eq('0')
  })

  it('can set the context value', () => {
    const isolated = isolateComponent.withContext(
      AnswerContext,
      42
    )(<DisplayAnswer />)
    expect(isolated.findOne('div').content()).to.eq('42')
  })

  it('uses last context value if there are multiple defined', () => {
    const isolated = isolateComponent
      .withContext(AnswerContext, 42)
      .withContext(
        AnswerContext,
        3
      )(<DisplayAnswer />)
    expect(isolated.findOne('div').content()).to.eq('3')
  })

  it('can set multiple contexts', () => {
    const isolated = isolateComponent
      .withContext(QuestionContext, 'what is the answer?')
      .withContext(
        AnswerContext,
        42
      )(<DisplayQuestionAndAnswer />)
    expect(isolated.findOne('div').content()).to.eq('what is the answer? 42')
  })
})
