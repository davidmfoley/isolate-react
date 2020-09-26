type Deps = any[] | undefined

const dirtyDependenciess = (a: Deps, b: Deps) => {
  if (a === undefined || b === undefined) return true
  if (a === [] && b === []) return false
  return a.some((value, i) => !Object.is(value, b[i]))
}

export default dirtyDependenciess
