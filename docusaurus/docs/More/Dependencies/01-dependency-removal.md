---
title: Avoid mocks/stubs by separating side-effects and logic
---

Before we get into all of the techniques we can use to invert a dependency, let's look at the most powerful technique we have for dealing with unruly dependencies: get rid of them.

Take our previous example:

```javascript
// api.js

import { findUserByEmail } from './database'

export const getUserName = async (email) => {
  const user = await findUserByEmail(email)

  if (!user) return "User Not Found"
  if (!user.name) return "No Name Provided"
  if (user.title) return `${user.title}. ${user.name}`

  return user.name
}
```

If we break out the logic we want to test into a separate function, we can then test that function without any "mocks" at all.


The result looks like this:

```javascript
// api.js

import { findUserByEmail } from './database'

export const formatUserName = (user) => {
  if (!user) return "User Not Found"
  if (!user.name) return "No Name Provided"
  if (user.title) return `${user.title}. ${user.name}`

  return user.name
}

export const getUserName = async (email) => {
  const user = await findUserByEmail(email)

  // Test this function directly
  return formatUserName(user)
}
```

Now, we can test `formatUserName` directly by passing in different values like `null` or `{ name: 'Arthur'}` and asserting about the result.

This is one of the most powerful tools in our software design toolkit, and should usually be the first one we reach for.

## But, now we aren't testing everything!

### How do we test that getUserName correctly calls findUserByEmail!?

You have a few options:

- Live with it. In this case, the invocation of findUserByEmail is not the important logic, and is trivial enough that we can assume it is correct.
- Combine this technique with one of the following techniques, and write tests that assert that the expected arguments are passed and that any exceptional cases are properly handled.


