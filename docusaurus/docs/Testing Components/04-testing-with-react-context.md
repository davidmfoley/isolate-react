---
title: Testing useContext
---

Two methods of setting context are provided, and they work the same for `isolateComponent` and `isolateComponentTree`:

### setContext

The `setContext` method supports setting a context value for testing.

Context is often used to store application level state that is accessed in various places throughout a react application.

Here's an example where context is used to store the name of the current user:

```typescript

const userContext = React.createContext({firstName: '', lastName: ''})

const CurrentUserName = () => {
  const user = useContext(userContext)

  return <span>{user.firstName} {user.lastName}</span>
}

```

We can use `setContext` to test the `CurrentUserName` component. For example, with jest our test might look like this:

```typescript
test('renders the name', () => {
  const nameComponent = isolateComponent(<CurrentUserName />)
  nameComponent.setContext(userContext, {firstName: 'Arthur', lastName: 'Dent'})
  expect(nameComponent.findOne('span').text()).toEqual('Arthur Dent')
})
```

### withContext

You can also set the context used for the *initial* render using the `isolateComponent.withContext` method. That works a little bit differently, and looks like this:

```typescript
test('renders the name, init', () => {
  const nameComponent = isolateComponent.withContext({firstName: 'Arthur', lastName: 'Dent'})( <CurrentUserName />)
  expect(nameComponent.findOne('span').text()).toEqual('Arthur Dent')
})
```

