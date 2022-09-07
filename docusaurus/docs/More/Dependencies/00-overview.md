---
title: Dependencies
sidebar_label: Dependencies
---

A guide to building software without losing your mind.

### This guide is a work-in-progress!


## What is a dependency?

Often in javascript programs, when module A needs to collaborate with module B, it imports that module and uses its exports directly.

For example, let's say we have a function that looks up a user from a database:

```javascript
// database.js

const db = connectToDatabase()

export const findUserByEmail = async (email) => {
  const result = await db.query(`select * from users where email = $1`, [email])

  return result.rows[0] || null
}
```

... and we want to test another function that uses the database function:

```javascript
// api.js

import { findUserByEmail } from './database'

export const getUserName = async (email) => {
  // get the user record from the database
  const user = await findUserByEmail(email)

  // logic we would like to test
  if (!user) return "User Not Found"
  if (!user.name) return "No Name Provided"
  if (user.title) return `${user.title}. ${user.name}`

  return user.name
}
```

We can say that the function `getUserName` *depends on* the function `findUserByEmail`.

We can further say that this is a "hard" or "static" dependency -- one that is "hard-wired" and not easily replaced. (Javascript as executed in node *does* provide the ability to override the import. However, it's usually an option of last resort and you should almost never need to do that)

## How does this affect us?

### Hard dependencies make our code harder to understand

The above example is simple: a function that depends on a single other function. In many applications, the dependencies are much more complex. At runtime, a single request will be serviced by many objects, and each of those objects can have many exposed methods, with only a few of them used. 

This leads to increased *coupling* between objects.

The techniques used to make our hard dependencies "softer" also tend to have the effect of making their interactions more *explicit*. 

### Hard dependencies make testing more difficult

If we want to test the logic in `getUserName` *without* a database, we need a way to give it a fake implementation of `findUserByEmail`, sometimes called a "mock". This can only be accomplished using a "file mock", which is a very complex technique that *increases* the coupling of tests to the implementation.

## What can we do?

"Inverting" or "injecting" a dependency means designing our software so that the dependency (`findUserByEmail`) can be specified outside of its usage (`getUserName`).

This sounds fancy, and there are a lot of fancy tools that provide "dependency injection".
However, most of the time no additional tools are necessary -- we just need to make some simple changes to the way we design our functions and objects.

The following pages explain many of the common techniques  we can use to invert dependencies in javascript and typescript. Some of the techniques are specific to react, and some are generally applicable to all javascript code.

### Notes

This guide is written with javascript and typescript in mind, in node and the browser. Some of the techniques in here are specific to react and are noted as such.

