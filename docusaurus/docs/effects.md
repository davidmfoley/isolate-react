### Effects

Easily test components that use `useEffect`.
Use `cleanup()` to test effect cleanup.

```js
import { isolateComponent } from 'isolate-components'

// Component with effect
const EffectExample = (props) => {
  useEffect(() => {
    console.log(`Hello ${props.name}`)
    // cleanup function
    return () => {
      console.log(`Goodbye ${props.name}`)
    }
  }, [props.name])
  return <span>Hello {props.name}</span>
}

// render the component, in isolation
const component = isolateComponent(<EffectExample name="Trillian" />)
// logs: "Hello Trillian"

component.setProps({ name: 'Zaphod' })
//logs: "Goodbye Trillian" (effect cleanup)
//logs: "Hello Zaphod" (effect runs because name prop has changed)

component.cleanup()
//logs: "Goodbye Zaphod"
```
