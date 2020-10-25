import { useEffect, useState } from 'react'

export const wrapClassComponent = <P>(t: {
  new (): React.Component<P, any>
}): ((p: P) => any) => {
  const instance = new t() as any

  let first = true
  let lastResult: any = null

  let prevProps: P | null = null
  let prevState: any | null = null

  return (props: P) => {
    const [componentState, setComponentState] = useState(instance.state)

    instance.setState = (s: any) => {
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

    instance.props = props
    instance.state = componentState

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

    if (shouldRender) {
      let snapshot = undefined
      if (instance.getSnapshotBeforeUpdate && !first) {
        snapshot = instance.getSnapshotBeforeUpdate(prevProps, prevState)
      }
      lastResult = instance.render()
      if (instance.componentDidUpdate && !first)
        instance.componentDidUpdate(prevProps, prevState, snapshot)
    }

    first = false
    return lastResult
  }
}
