export const componentIsContextProviderForType = (component: any, t: any) => {
  return t === component?._context && component === t.Provider
}
