import isolateHooks from 'isolate-hooks'

type FindSpec = string | React.FC<any>

interface IsolatedNode<P> {
  type: React.FC<P> | string
  props: P
}

interface IsolatedComponent<P> {
  findAll: (spec?: FindSpec) => IsolatedNode<any>[]
  findOne: (spec?: FindSpec) => IsolatedNode<any>
  mergeProps: (props: Partial<P>) => void
}

export const isolateComponent = <P>(
  componentElement: React.ReactElement<P, any>
): IsolatedComponent<P> => {
  let lastResult: React.ReactNode
  const allNodes = (e: any) => [e]
  let props = componentElement.props

  const nodeMatches = (spec: FindSpec | null, node: any) => {
    if (!spec) return true
    return node.type === spec
  }

  const render = isolateHooks(() => {
    lastResult = componentElement.type(props)
  })

  render()

  return {
    findAll: (spec?: FindSpec) => {
      return allNodes(lastResult).filter((el) => nodeMatches(spec || null, el))
    },
    findOne: (spec?: FindSpec) => {
      const el = allNodes(lastResult).find((el) =>
        nodeMatches(spec || null, el)
      )
      if (!el) throw new Error(`Could not find node matching '${spec}'`)
      return el
    },
    mergeProps: (propsToMerge: Partial<P>) => {
      props = { ...props, ...propsToMerge }
      render()
    },
  }
}
