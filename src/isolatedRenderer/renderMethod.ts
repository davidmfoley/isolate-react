import { wrapClassComponent } from './wrapClassComponent'
import { wrapReactMemo } from './wrapReactMemo'
export type RenderMethod<P> = (props: P) => any

type OnContextChange = (t: any, v: any) => void

const wrapContextProvider = (t: any, onContextChange: OnContextChange) => {
  let value: any = t._currentValue
  return (props: any) => {
    if (value !== props.value) {
      value = props.value
      onContextChange(t, props.value)
    }
    return props.children
  }
}

export const getRenderMethod = <P>(
  t: any,
  onContextChange: OnContextChange
): RenderMethod<P> => {
  let proto = t.prototype
  let type = t['$$typeof']

  if (type?.toString() === 'Symbol(react.memo)') return wrapReactMemo(t)
  if (type?.toString() === 'Symbol(react.forward_ref)') return t.render

  if (proto?.isReactComponent || type?.toString() === 'Symbol(react.memo)') {
    return wrapClassComponent(t)
  }

  if (t._context) return wrapContextProvider(t._context, onContextChange)

  return t
}
