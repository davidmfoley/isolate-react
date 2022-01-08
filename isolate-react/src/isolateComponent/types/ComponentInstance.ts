import React from 'react'
import { Selector } from '../../isolateComponent'
import { NodeTree } from '../nodeTree'

export interface ComponentInstance<P> {
  render: () => void
  cleanup: () => void
  setProps: (props: P) => void
  setContext: <T>(type: React.Context<T>, value: T) => void
  tree(): NodeTree
  mergeProps: (props: Partial<P>) => void
  inlineAll: (selector: Selector) => void
}
