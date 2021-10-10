type OnContextChange = (t: any, v: any) => void

export const wrapContextProvider = (
  t: any,
  onContextChange: OnContextChange
) => {
  let value: any = t._context._currentValue
  return (props: any) => {
    if (value !== props.value) {
      value = props.value
      onContextChange(t._context, props.value)
    }
    return props.children
  }
}
