---
title: Use context to centralize state in complex user interface
---

## Use context to centralize state and side effects in a complex user interface

Some interfaces feature layouts that are complex, where components that reference the shared state can be rendered inside of components that have no direct knowledge of that state.

A common example is the "current user". Often there is a context provider near the very top level of the react application that holds the current user and provides methods to `login`, `logout`, and `register`.

In the application, we may want to render a different experience depending on whether the current user is logged in or not. Rather than pass that information all the way down from the top level, we can access it via the context.

```typescript

const currentUserContext = React.createContext({loggedIn: false, name: ""})

const HelloUser = () => {
  const currentUser = React.useContext(currentUserContext)
  if (currentUser.loggedIn) {
    return <span>Hello, {currentUser.name}</span>
  }

  return null
}

const App = () => {
  const [currentUser, setCurrentUser] = useState({loggedIn: false, name: ""})

  return (
    <currentUserContext.Provider value={currentUser}}>
      {/* ...more components */}
      <HelloUser />
    </currentUserContext.Provider>
  )
}
```


### Wrap the context in a hook

When I take the time to move state to a context, I also like to wrap that context with a hook. This decouples consuming code from the "how" and also lets me give the hook a nice name.

```typescript
const currentUserContext = React.createContext({loggedIn: false, name: ""})

```

### Beware of stability

## Usages

There are a few main cases where this is useful:

### Global State

Use this pattern for "global" state like current user (see above)

### Composed interfaces that share state

Sometime interfaces are dynamically composed of components that reference the same current state that is managed "above them" in the tree.

For example, in a widget-tracking application, the route `/widgets/42` may contain a complex interface with views of the widget inventory, sales data, and pricing.

Moving the `currentWidget` lookup into a hook that is backed by context can reduce "prop-drilling" -- that is, passing prop values down to child components.
