type Deps = any[] | undefined

const dirtyDependencies = (a: Deps, b: Deps) => {
  if (a === undefined || b === undefined) return true
  return a.some((value, i) => !Object.is(value, b[i]))
}

export default dirtyDependencies
