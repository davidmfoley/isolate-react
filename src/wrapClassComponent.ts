import { useEffect, useState } from 'react'

export const wrapClassComponent = <P>(t: {
  new (): React.Component<P>
}): ((p: P) => any) => {
  const instance = new t() as any

  let first = true
  let lastResult: any = null

  return (props: P) => {
    const [componentState, setComponentState] = useState(instance.state)

    instance.setState = (s: any) => {
      if (typeof s === 'function') throw new Error('not yet implemented')
      const nextState = { ...componentState, ...s }
      setComponentState(nextState)
    }
    const shouldRender =
      !!instance.shouldComponentUpdate && !first
        ? instance.shouldComponentUpdate(props, componentState)
        : true

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
      lastResult = instance.render()
      if (instance.componentDidUpdate && !first) instance.componentDidUpdate()
    }

    first = false
    return lastResult
  }
}
