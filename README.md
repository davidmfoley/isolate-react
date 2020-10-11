## isolate-components
[![npm badge](https://img.shields.io/npm/v/isolate-components)](https://npmjs.com/package/isolate-components)

Isolate and test your modern react components without the need for DOM emulators.

Supports hooks and has no dependency on DOM emulators.

### Project progress

This is relatively new -- your feature requests and feedback are appreciated.

See the [project tracker](https://github.com/davidmfoley/isolate-components/projects/1) for project progress.

File an [issue](https://github.com/davidmfoley/isolate-components/issue) if you have a suggestion or request.

### Installation

`yarn add --dev isolate-components` or `npm install -D isolate-components`

### Usage

See [documentation](https://davidmfoley.github.io/isolate-components/modules/_index_.html)

```
import { isolateComponent } from 'isolate-components'
const MyComponent = (props) => (
  <span>Hello {props.name}</span>
)
const component = isolateComponent(<MyComponent name='Trillian' />)
console.log(component.findOne('span').content()) // => 'Hello Trillian'
component.setProps({name: 'Zaphod'})
console.log(component.findOne('span').content()) // => 'Hello Zaphod'
```
