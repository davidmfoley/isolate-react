import { TreeNode } from '../types'

export const doDebug = (node: TreeNode, indent = 0) => {
  let lines = [] as string[]
  const space = indent
    ? Array(indent - 1)
        .fill(' ')
        .join('') + ' -> '
    : ''
  let pushLine = (s: string) => lines.push(`${space}${s}`)

  const { children, ...rest } = node

  pushLine(JSON.stringify(rest))

  if (node.nodeType === 'isolated') {
    lines = lines.concat(
      doDebug(node.componentInstance!.tree().root(), indent + 1)
    )
  } else {
    node.children.forEach((child) => {
      lines = lines.concat(doDebug(child, indent + 1))
    })
  }

  return lines.join('\n')
}
