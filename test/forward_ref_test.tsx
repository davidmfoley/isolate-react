import { describe, it } from 'mocha'
import React from 'react'
import { isolateComponent } from '../src'

// support components that use forwardRef, such as styled-components
describe('forwardRef', () => {
  const InnerButton = () => <button />
  const RefButton = React.forwardRef(InnerButton)

  const ExampleWithButton = () => (
    <div>
      <RefButton />
    </div>
  )

  it('can render forwardRef component', () => {
    const isolated = isolateComponent(<RefButton />)
    isolated.findOne('button')
  })

  it('can find', () => {
    const isolated = isolateComponent(<ExampleWithButton />)

    isolated.findOne(RefButton)
  })

  it('can inline', () => {
    const isolated = isolateComponent(<ExampleWithButton />)

    isolated.inline(RefButton)
    isolated.findOne('button')
  })
})
