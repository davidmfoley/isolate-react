import { describe, it } from 'mocha'
import assert from 'node:assert'
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
    assert.strictEqual(hook(store), 42)
  })

  it('updates upon store notification', () => {
    const store = exampleExternalStore()
    const hook = isolateHook(useSyncExternalStoreExample)
    hook(store)
    store.setValue(42)
    assert.strictEqual(hook(store), 42)
  })

  it('unsubscribes', () => {
    const store = exampleExternalStore()
    const hook = isolateHook(useSyncExternalStoreExample)
    hook(store)
    hook.cleanup()
    assert.strictEqual(store.callback(), initialCallback)
  })
})
