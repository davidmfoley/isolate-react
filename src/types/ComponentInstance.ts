import { NodeTree } from '../nodeTree'

export interface ComponentInstance<P> {
  render: () => void
  cleanup: () => void
  setProps: (props: P) => void
  tree(): NodeTree
  mergeProps: (props: Partial<P>) => void
}
