import { TreeNode } from '../../types'
import { ComponentInstance } from '../../types/ComponentInstance'
import { RenderableComponent } from '../../types/RenderableComponent'
import { formatChildren } from './common'

export const isolatedNode = (
  instance: ComponentInstance<any>,
  componentType: RenderableComponent
): TreeNode => ({
  nodeType: 'isolated',
  type: componentType,
  componentInstance: instance,
  get children() {
    return [instance.tree().root()]
  },
  name: '',
  props: {},
  content: () => formatChildren([instance.tree().root()]),
  toString: () => formatChildren([instance.tree().root()]),
})
