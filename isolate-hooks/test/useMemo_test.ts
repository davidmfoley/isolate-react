import { describe, it } from 'mocha'
import { expect } from 'chai'

import isolateHook from '../src'
import { useMemo } from 'react'

describe('useMemo', () => {
  it('is computed first time', () => {
    let count = 0

    const useMemoExample = () =>
      useMemo(() => {
        count++
        return count
      }, [])

    const isolated = isolateHook(useMemoExample)
    expect(isolated()).to.eq(1)
  })

  it('is not computed on next render if deps unchanged', () => {
    let count = 0

    const useMemoExample = () =>
      useMemo(() => {
        count++
        return count
      }, [])

    const isolated = isolateHook(useMemoExample)
    expect(isolated()).to.eq(1)
  })

  it('is not computed on next render if deps unchanged', () => {
    let count = 0

    const useMemoExample = () =>
      useMemo(() => {
        count++
        return count
      }, [count])

    const isolated = isolateHook(useMemoExample)
    isolated()
    expect(isolated()).to.eq(2)
  })
})
