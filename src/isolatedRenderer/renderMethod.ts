import { wrapClassComponent } from './wrapClassComponent'
import { wrapContextConsumer } from './wrapContextConsumer'
import { wrapContextProvider } from './wrapContextProvider'
import { wrapReactMemo } from './wrapReactMemo'

export type RenderMethod<P> = (props: P) => any

type OnContextChange = (t: any, v: any) => void

type ComponentRenderType =
  | 'memo'
  | 'forwardRef'
  | 'classComponent'
  | 'contextProvider'
  | 'contextConsumer'
  | 'functional'

const renderMethods: Record<
  ComponentRenderType,
  (t: any, onContextChange: OnContextChange) => RenderMethod<any>
> = {
  memo: wrapReactMemo,
  forwardRef: (t) => t.render,
  classComponent: wrapClassComponent,
  contextProvider: wrapContextProvider,
  contextConsumer: wrapContextConsumer,
  functional: (t) => t,
}

export const categorizeComponent = (t: any): ComponentRenderType => {
  let proto = t.prototype
  let type = t['$$typeof']

  if (type?.toString() === 'Symbol(react.memo)') return 'memo'
  if (type?.toString() === 'Symbol(react.forward_ref)') return 'forwardRef'

  if (proto?.isReactComponent) {
    return 'classComponent'
  }

  if (t._context) {
    return t._context.Consumer === t ? 'contextConsumer' : 'contextProvider'
  }

  return 'functional'
}

export const getRenderMethod = <P>(
  t: any,
  onContextChange: OnContextChange
): RenderMethod<P> => {
  const type = categorizeComponent(t)
  const method = renderMethods[type]
  return method(t, onContextChange)
}
