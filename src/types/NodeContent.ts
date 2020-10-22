export interface NodeContent {
  /**
   * Returns the inner content of the node, formatted for debugging
   */
  content(): string | null
  /**
   * Returns the outer content of the node (including its tag and props), formatted for debugging
   */
  toString(): string
}
