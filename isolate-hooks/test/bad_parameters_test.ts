import { describe, it } from 'mocha'
import { expect } from 'chai'

import isolateHooks from '../src'

describe('handling common errors', () => {
  it('handles a null hook', () => {
    expect(() => isolateHooks(null)).to.throw(
      /Expected a hook function but got null/
    )
  })

  it('handles undefined hook', () => {
    expect(() => isolateHooks(undefined)).to.throw(
      /Expected a hook function but got undefined/
    )
  })

  it('handles non-function hook', () => {
    expect(() => isolateHooks(42 as any)).to.throw(
      /Expected a hook function but got number \(42\)/
    )
  })
})
