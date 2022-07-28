import { TreeNode } from '../types'

const debugType = (type: any) => {
  if (typeof type === 'function') return { type: type.name }
  if (type._context) {
    return {
      type:
        type._context.Consumer === type
          ? `context consumer`
          : `context provider`,
      value: type._context._currentValue,
    }
  }
  return { type }
}

export const doDebug = (node: TreeNode, indent = 0) => {
  let lines = [] as string[]
  const space = indent
    ? Array(indent - 1)
        .fill(' ')
        .join('') + ' -> '
    : ''
  let pushLine = (s: string) => lines.push(`${space}${s}`)

  const { children, componentInstance, type, ...rest } = node

  pushLine(JSON.stringify({ ...rest, ...debugType(type) }))

  if (node.nodeType === 'isolated') {
    lines = lines.concat(doDebug(componentInstance!.tree().root(), indent + 1))
  } else {
    node.children.forEach((child) => {
      lines = lines.concat(doDebug(child, indent + 1))
    })
  }

  return lines.join('\n')
}
