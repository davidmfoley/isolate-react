import { describe, it } from 'mocha'
import { expect } from 'chai'

import { testInIsolation } from '../src'
import { useMemo } from 'react'

describe('useMemo', () => {
  it('is computed first time', () => {
    let count = 0

    const useMemoExample = () =>
      useMemo(() => {
        count++
        return count
      }, [])

    const isolated = testInIsolation(useMemoExample)
    expect(isolated.currentValue()).to.eq(1)
  })

  it('is not computed on next render if deps unchanged', () => {
    let count = 0

    const useMemoExample = () =>
      useMemo(() => {
        count++
        return count
      }, [])

    const isolated = testInIsolation(useMemoExample)
    isolated.invoke()
    expect(isolated.currentValue()).to.eq(1)
  })

  it('is not computed on next render if deps unchanged', () => {
    let count = 0

    const useMemoExample = () =>
      useMemo(() => {
        count++
        return count
      }, [count])

    const isolated = testInIsolation(useMemoExample)
    isolated.invoke()
    expect(isolated.currentValue()).to.eq(2)
  })
})
