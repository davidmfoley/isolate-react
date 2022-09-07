---
title: Default arguments
---

## Description

Add services to each function that uses them as arguments.

In production, use default argument values to bring in the production implementations.

In tests, pass in test implementations.


## Example

**api.ts**

```javascript
// production api implementation
export const api = {
  getWidget: (id) => { ... }
}
```

**widgets.ts**
```javascript
import { api } from './api'

export const widgets = {
  getWidgetName: async (widgetId, widgetApi = api) => {
    const widget = await widgetApi.getWidget(widgetId);
    if (!widget) return "Unknown Widget"
    return widget.name
  }
}

```

**widgets.test.ts**
```javascript
import { widgets } from './widgets'

describe("getWidgetName", () => {
  test("unknown widget returns 'Unknown Widget'", () => {
    const fakeApi = {
      getWidget: async () => undefined
    }

    // pass in the test implementation
    expect(getWidgetName(42, fakeApi)).toEqual('Unknown Widget')
  })
})
```

## A common usage: getting the current time

Testing time can be annoying. For example, we might have a function that returns a natural language description of the age of some entity in our system. Let's say, for example a comment on a blog post:

```javascript
const describeAge = (comment) => {
  
  const ageInMilliseconds = Date.now() - comment.createdAt
  if (ageInMilliseconds < 60 * 1000) {
    return "Just now"
  }

  ... a bunch more logic here to diplay minutes, hours, days, weeks, etc. ....

}
```

Testing this requires generating different comment objects based on the current computer date. Since the computer date is changing as the tests run, it also makes it difficult to test boundary conditions. A simple solution is to add an additional argument with a default value:

```javascript
const describeAge = (comment, now = Date.now()) => {
  
  const ageInMilliseconds = now - comment.createdAt
  if (ageInMilliseconds < 60 * 1000) {
    return "Just now"
  }

  ... a bunch more logic here to diplay minutes, hours, days, weeks, etc. ....

}
```

Now it is simple to pass in a date for testing, and at runtime the current date will use used at all times.


## Notes

This is a general technique that can be used anywhere, not only in react-aware code.

