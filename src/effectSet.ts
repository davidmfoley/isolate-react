import dirtyDependencies from './dirtyDependencies'

type Effect = () => void | Function

type EffectState = {
  effect: Effect
  deps?: any[]
  dirty: boolean
  cleanup?: Function | void
}

type Deps = any[] | undefined

export const createEffectSet = () => {
  let effects: EffectState[] = []
  let nextEffects: EffectState[] = []

  const flush = () => {
    const dirtyEffects = nextEffects.filter((e) => e.dirty)
    dirtyEffects.forEach((e) => {
      if (e.cleanup) e.cleanup()
      e.cleanup = e.effect()
    })

    effects = nextEffects
  }

  return {
    cleanup: () => {
      effects.forEach((effect) => {
        if (typeof effect.cleanup === 'function') {
          effect.cleanup()
        }
      })
    },
    flush,
    nextEffect: (effect: Effect, deps: Deps) => {
      const firstTime = !effects.length

      const nextEffect: EffectState = { effect, deps, dirty: firstTime }

      if (!firstTime) {
        const existing = effects.shift()
        nextEffect.dirty = dirtyDependencies(existing.deps, deps)
        nextEffect.cleanup = existing.cleanup
      }

      nextEffects.push(nextEffect)
      return
    },
  }
}
