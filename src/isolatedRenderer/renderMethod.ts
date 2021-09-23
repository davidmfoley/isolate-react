import { wrapClassComponent } from './wrapClassComponent'
import { wrapReactMemo } from './wrapReactMemo'
export type RenderMethod<P> = (props: P) => any

export const getRenderMethod = <P>(t: any): RenderMethod<P> => {
  let proto = t.prototype
  let type = t['$$typeof']

  if (type?.toString() === 'Symbol(react.memo)') return wrapReactMemo(t)
  if (type?.toString() === 'Symbol(react.forward_ref)') return t.render

  if (proto?.isReactComponent || type?.toString() === 'Symbol(react.memo)') {
    return wrapClassComponent(t)
  }

  if (t._context) return (props: any) => props.children

  return t
}
