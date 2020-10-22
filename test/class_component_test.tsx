import { describe, it } from 'mocha'
import React from 'react'
import { isolateComponent } from '../src'
import { ClassesNotSupportedError } from '../src/errors'
import { expect } from 'chai'

class ExampleClassComponent extends React.Component<{}> {}
class SubclassedClassComponent extends ExampleClassComponent {}
const ExampleFunctionComponent = () => <div />

describe('React class components', () => {
  it('should throw an error if isolating class component', () => {
    expect(() => {
      isolateComponent(<ExampleClassComponent />)
    }).to.throw(ClassesNotSupportedError)
  })

  it('should throw an error if isolating subclassed class component', () => {
    expect(() => {
      isolateComponent(<SubclassedClassComponent />)
    }).to.throw(ClassesNotSupportedError)
  })

  it('should not throw an error if isolating functional component', () => {
    isolateComponent(<ExampleFunctionComponent />)
  })
})
