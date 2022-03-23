import { isolateComponent } from 'isolate-react'
import React from 'react'
import { CounterButton } from './CounterButton'

test('starts at zero', () => {
  const counterButton = isolateComponent(<CounterButton />)
  expect(counterButton.findOne('span.count').content()).toEqual('0')
})

test('increments upon click', () => {
  const counterButton = isolateComponent(<CounterButton />)

  counterButton.findOne('button').props.onClick()
  expect(counterButton.findOne('span.count').content()).toEqual('1')
})
