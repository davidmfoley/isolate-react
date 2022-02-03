/**
 * A context value used for testing useContext
 */
export interface IsolatedHookContext {
  /**
   * The type of context. The return value of `React.CreateContext`.
   */
  type: React.Context<any>
  /**
   * Value for the context.
   */
  value: any
}

/**
 * Options when isolating hook, passed as 2nd argument
 */
export interface IsolatedHookOptions {
  /**
   * An array of context values, useful when testing useContext
   */
  context?: IsolatedHookContext[]
}
