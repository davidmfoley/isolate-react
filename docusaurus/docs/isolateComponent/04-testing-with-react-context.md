---
title: Testing useContext
---

The `setContext` method supports setting a context value for testing.

Context is often used to store application level state, such as the identity of the current user.

```typescript

const userContext = React.createContext({firstName: '', lastName: ''})

const CurrentUserName = () => {
  const user = useContext(userContext)

  return <span>{user.firstName} {user.lastName}</span>
}

```


