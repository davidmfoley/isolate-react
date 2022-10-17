const propsAreEqual = (p1 = {}, p2 = {}) => {
  const k1 = Object.keys(p1)
  const k2 = Object.keys(p2)
  if (k1.length !== k2.length) return false
  for (let k of k1) {
    if (p2[k] !== p1[k]) return false
  }

  return true
}

export const wrapReactMemo = (
  t: any,
  onContextChange: any,
  getRenderMethod: any
) => {
  let lastProps = null
  let cachedResult = null
  let compare = t.compare || propsAreEqual

  const renderMethod = getRenderMethod(t.type, onContextChange)

  return (props: any) => {
    if (cachedResult && compare(props, lastProps)) return cachedResult
    lastProps = props

    cachedResult = renderMethod(props)

    return cachedResult
  }
}
