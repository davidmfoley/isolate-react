type Parameters<T> = T extends (...args: infer T) => any ? T : never
type WrappedFunction<F extends (...args: any) => any> = (
  ...args: Parameters<F>
) => ReturnType<F>

export type IsolatedHookMethods<F extends (...args: any) => any> = {
  cleanup: () => void
  /**
   * Get the value returned by the most recent hook invocation
   */
  currentValue: () => ReturnType<F>
  /**
   * Force hook to run
   */
  invoke: WrappedFunction<F>
  /**
   * Set the current value of a ref
   * @param index The zero-based index of the ref (zero for the first useRef, one for the second, etc.)
   * @param value Value to set.
   */
  setRef: (index: number, value?: any) => void
  setContext: <T>(contextType: React.Context<T>, value: T) => void
}
/**
 *  A hook running in isolation. This is the return value from isolateHook.
 */
export type IsolatedHook<F extends (...args: any) => any> =
  IsolatedHookMethods<F> & F
