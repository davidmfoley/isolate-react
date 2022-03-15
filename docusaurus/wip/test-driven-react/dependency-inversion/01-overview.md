## Dependency Inversion

### What is it?

Often in our programs, when module A needs to collaborate with module B, it imports that module and uses its exports directly:

For example:

```javascript
// database.js

export const findUserByEmail = (email) => {
  // ...some code here that talks to the database ...
}
```

```javascript
// api.js

import { findUser } from './database'

export const getUserName = async (email) => {
  const user = await findUserByEmail(email)
  return user.name || "No Name Provided"
}
```

We can say that `getUserName` *depends on* findUserByEmail.

We call this a *static* dependency, because the reference to findUserByEmail is static, or unchanging. ("Static" is also a keyword in some other programming languages that specifies that a variable or function is the same for all instances of a class, rather than unique to each instance)

Testing `getUserName` requires running a database or overriding imports. An alternate option is to provide a mechanism to invert the dependency.

"Inverting" a dependency means designing our software so that the dependency (`findUserByEmail`) can be specified outside of its usage (`getUserName`).



### How does it work?



