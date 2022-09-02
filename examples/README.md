A set of examples demonstrating the usage of `isolate-react`, using jest as the test runner.

You can clone these examples and run them yourself:

`git clone git@github.com:davidmfoley/isolate-react.git`

`cd isolate-react/examples`

`yarn`

Run the examples once:

`yarn examples`

Watch the examples and run them on change:

`yarn examples:watch`

## Examples

### [CounterButton]('./CounterButton')

Demonstrates testing a simple component.

### [ShoppingList]('./ShoppingList')

Demonstrates testing a react component with two approaches:
1. "Shallow" testing, using `isolateComponent`
2. "Deep" testing using `isolateComponentTree`

### [useRememberNames]('./useRememberNames')

Demonstrates testing a hook that uses `useEffect` and `useState`.

### [useTodos]('./useTodos')

Demonstrates testing a hook with slightly more complex state.
