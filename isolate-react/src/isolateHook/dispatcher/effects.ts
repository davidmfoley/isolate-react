type Deps = any[] | undefined

export const createEffectHandler =
  (effectSet: any) => (effect: () => (() => void) | undefined, deps: Deps) => {
    effectSet.nextEffect(effect, deps)
  }
