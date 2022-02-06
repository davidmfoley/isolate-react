import { IsolatedHook } from './IsolatedHook'
import { IsolatedHookOptions } from './IsolatedHookOptions'

export type IsolateHook = <F extends (...args: any[]) => any>(
  hookInvocation: F,
  options?: IsolatedHookOptions
) => IsolatedHook<F>
