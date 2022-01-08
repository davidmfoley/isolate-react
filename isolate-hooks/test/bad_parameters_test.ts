import { describe, it } from 'mocha'
import { expect } from 'chai'

import isolateHook from '../src'

describe('handling common errors', () => {
  it('handles a null hook', () => {
    expect(() => isolateHook(null)).to.throw(
      /Expected a hook function but got null/
    )
  })

  it('handles undefined hook', () => {
    expect(() => isolateHook(undefined)).to.throw(
      /Expected a hook function but got undefined/
    )
  })

  it('handles non-function hook', () => {
    expect(() => isolateHook(42 as any)).to.throw(
      /Expected a hook function but got number \(42\)/
    )
  })
})
