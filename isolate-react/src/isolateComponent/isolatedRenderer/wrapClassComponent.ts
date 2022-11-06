import { useEffect, useState } from 'react'
import { Renderer } from './renderMethod'

export const wrapClassComponent = <P>(t: {
  new (props: P): React.Component<P, any>
  getDerivedStateFromError?: any
}): Renderer<P> => {
  let first = true
  let lastResult: any = null

  let prevProps: P | null = null
  let prevState: any | null = null
  let setStateCallbacks: Function[] = []

  let updateComponentState: Function = () => {}

  let instance: any

  const render = (props: P) => {
    instance = instance || (new t(props) as any)
    const [componentState, setComponentState] = useState(instance.state)
    updateComponentState = setComponentState

    instance.setState = (s: any, cb: Function) => {
      if (cb) setStateCallbacks.push(cb)
      if (typeof s === 'function') {
        setComponentState(s(instance.state))
      } else {
        const nextState = { ...componentState, ...s }
        setComponentState(nextState)
      }
    }

    const shouldRender =
      !!instance.shouldComponentUpdate && !first
        ? instance.shouldComponentUpdate(props, componentState)
        : true

    if (shouldRender) {
      prevProps = instance.props
      prevState = instance.state
    }

    useEffect(() => {
      if (instance.componentDidMount) {
        instance.componentDidMount()
      }
      return () => {
        if (instance.componentWillUnmount) {
          instance.componentWillUnmount()
        }
      }
    }, [])

    instance.props = props
    instance.state = componentState

    if (shouldRender) {
      let snapshot = undefined
      if (instance.getSnapshotBeforeUpdate && !first) {
        snapshot = instance.getSnapshotBeforeUpdate(prevProps, prevState)
      }

      lastResult = instance.render()

      if (instance.componentDidUpdate && !first)
        instance.componentDidUpdate(prevProps, prevState, snapshot)

      while (setStateCallbacks.length) setStateCallbacks.shift()()
    }

    first = false
    return lastResult
  }
  return {
    render,
    tryToHandleError: (error: Error) => {
      if (
        !instance ||
        !(instance.componentDidCatch || t.getDerivedStateFromError)
      )
        return { handled: false }

      if (instance.componentDidCatch) {
        instance.componentDidCatch(error, {} as any)
      }

      if (t.getDerivedStateFromError) {
        const derived = t.getDerivedStateFromError(error)
        updateComponentState(derived)
      }

      return { handled: true, result: lastResult }
    },
  }
}
