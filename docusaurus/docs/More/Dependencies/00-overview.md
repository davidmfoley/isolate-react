## This section is a work-in-progress

## Dependency Inversion

### What is it?

Often in our programs, when module A needs to collaborate with module B, it imports that module and uses its exports directly:

For example, let's say we have a function that looks up a user from our database:

```javascript
// database.js

const db = connectToDatabase()

export const findUserByEmail = async (email) => {
  const result = await db.query(`select * from users where email = $1`, [email])

  return result.rows[0] || null
}
```

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

We can say that `getUserName` *depends on* `findUserByEmail`.

If we want to test the logic in `getUserName` *without* a database, we need a way to give it a fake implementation of `findUserByEmail`, sometimes called a "mock".

"Inverting" a dependency means designing our software so that the dependency (`findUserByEmail`) can be specified outside of its usage (`getUserName`).

This sounds fancy, and there are a lot of fancy tools that provide "dependency injection".
However, most of the time no additional tools are necessary to invert.

The following pages explain many of the common techniques to invert dependencies in javascript and typescript. Some of the techniques are specific to react, and some are generally applicable to all javascript code.


