import { test, expect } from '@jest/globals'
import { isolateComponent } from 'isolate-react'
import React, { useState } from 'react'

// this is the component we want to test
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
