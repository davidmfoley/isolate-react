export const disableReactWarnings = () => {
  let originalError: any
  before(() => {
    originalError = console.error.bind(console)
    console.error = () => {}
  })

  after(() => {
    console.error = originalError
  })
}
