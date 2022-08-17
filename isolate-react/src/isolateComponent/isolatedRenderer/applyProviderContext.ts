import { componentIsContextProviderForType } from './componentIsContextProviderForType'
import { RenderContext } from './renderContext'

export const applyProviderContext = (
  component: any,
  props: any,
  renderContext: RenderContext
) => {
  if (
    component._context &&
    componentIsContextProviderForType(component, component._context)
  ) {
    return renderContext.withContext(component._context, props.value)
  }
  return renderContext
}
