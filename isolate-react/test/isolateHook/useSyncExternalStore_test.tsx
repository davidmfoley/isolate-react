import { describe, it } from 'mocha'

import { expect } from 'chai'

import { isolateHook } from '../../src/isolateHook'
import { useSyncExternalStore } from 'react'

const initialCallback = () => {}

const exampleExternalStore = () => {
  let callback = initialCallback
  let value: any

  return {
    subscribe: (fn: () => void) => {
      callback = fn
      return () => {
        callback = initialCallback
      }
    },
    getSnapshot: () => value,
    setValue: (nextValue: any) => {
      value = nextValue
      callback()
    },
    callback: () => callback,
  }
}

type ExampleStore = ReturnType<typeof exampleExternalStore>

describe('useSyncExternalStore', () => {
  const useSyncExternalStoreExample = (store: ExampleStore) => {
    return useSyncExternalStore(store.subscribe, store.getSnapshot)
  }

  it('initally gets the snapshot value', () => {
    const store = exampleExternalStore()
    store.setValue(42)
    const hook = isolateHook(useSyncExternalStoreExample)
    expect(hook(store)).to.eq(42)
  })

  it('updates upon store notification', () => {
    const store = exampleExternalStore()
    const hook = isolateHook(useSyncExternalStoreExample)
    hook(store)
    store.setValue(42)
    expect(hook(store)).to.eq(42)
  })

  it('unsubscribes', () => {
    const store = exampleExternalStore()
    const hook = isolateHook(useSyncExternalStoreExample)
    hook(store)
    hook.cleanup()
    expect(store.callback()).to.eq(initialCallback)
  })
})
