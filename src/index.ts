import isolateHooks from 'isolate-hooks'
import { nodeTree, NodeTree, TreeNode } from './nodeTree'

type FindSpec = string | React.FC<any>

/*
interface IsolatedNode<P> {
  type: React.FC<P> | string
  props: P
}
*/

interface IsolatedComponent<P> {
  findAll: (spec?: FindSpec) => TreeNode[]
  findOne: (spec?: FindSpec) => TreeNode
  mergeProps: (props: Partial<P>) => void
  setProps: (props: P) => void
}

const allNodes = (e: any) => {
  const children = Array.isArray(e.props.children) ? e.props.children : []
  console.log(';', e, children)
  return [e].concat(children.flatMap(allNodes))
}

export const isolateComponent = <P>(
  componentElement: React.ReactElement<P, any>
): IsolatedComponent<P> => {
  let lastResult: React.ReactNode
  let props = componentElement.props
  let tree: NodeTree

  const nodeMatches = (spec: FindSpec | null, node: any) => {
    if (!spec) return true
    return node.type === spec
  }

  const render = isolateHooks(() => {
    lastResult = componentElement.type(props)
    tree = nodeTree(lastResult)
  })

  render()

  return {
    findAll: (spec?: FindSpec) => {
      return tree.filter((n) => nodeMatches(spec, n))
    },
    findOne: (spec?: FindSpec) => {
      const found = tree.find((n) => nodeMatches(spec, n))
      if (!found) throw new Error(`Could not find element matching ${spec}`)
      return found
    },
    mergeProps: (propsToMerge: Partial<P>) => {
      props = { ...props, ...propsToMerge }
      render()
    },
    setProps: (nextProps: P) => {
      props = nextProps
      render()
    },
  }
}
