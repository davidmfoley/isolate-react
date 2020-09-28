import { describe, it } from 'mocha'
import { expect } from 'chai'

import { isolateHooks } from '../src'
import { useCallback, useState } from 'react'

describe('useCallback', () => {
  it('is stable with no deps', () => {
    const useCallbackExample = () => useCallback(() => {}, [])

    const isolated = isolateHooks(useCallbackExample)
    const first = isolated.currentValue()
    isolated.invoke()
    expect(first).to.eq(isolated.currentValue())
  })

  it('is a new instance when deps change', () => {
    let setValue: (v: number) => void

    const useCallbackExample = () => {
      const [val, setter] = useState(0)
      setValue = setter
      return useCallback(() => val, [val])
    }

    const isolated = isolateHooks(useCallbackExample)
    const first = isolated.currentValue()
    setValue(1)
    expect(first).not.to.eq(isolated.currentValue())
    expect(first()).to.eq(0)
    expect(isolated.currentValue()()).to.eq(1)
  })

  it('is the same instance when deps do not change', () => {
    let setValue: (v: number) => void
    const useCallbackExample = () => {
      const [val, setter] = useState(0)
      setValue = setter
      return useCallback(() => val, [val])
    }

    const isolated = isolateHooks(useCallbackExample)
    setValue(1)
    const first = isolated.currentValue()
    setValue(1)
    expect(first()).to.eq(1)
    expect(isolated.currentValue()()).to.eq(1)
    expect(first).to.eq(isolated.currentValue())
  })
})
