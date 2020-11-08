import { wrapClassComponent } from './wrapClassComponent'
export type RenderMethod<P> = (props: P) => any

export const getRenderMethod = <P>(t: any): RenderMethod<P> => {
  let proto = t.prototype
  if (proto?.isReactComponent) {
    return wrapClassComponent(t)
  }

  return t
}
