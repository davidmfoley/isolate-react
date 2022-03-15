---
title: Class constructors
---

## Description

A class takes the required services in its constructor, and stores them in instance variables.

In production, we can either default the values of these variables or expose an instance of the class, constructed with the production services.

In tests, pass test implementations into the constructor.

## Notes

This requires the use of classes.

The mechanics are very similar to [closures](./02-closures)

## Example

**api.ts**

```js
// production api implementation
export const api = {
  getWidget: (id) => { ... }
}
```

**widgets.ts**
```js
import { api } from './api'

export class Widgets {
  constructor(api) {
    this.api = api
  }

  async getWidgetName(widgetId) {
    const widget = await this.api.getWidget(widgetId);
    if (!widget) return "Unknown Widget"
    return widget.name
  }
}

// optional -- export a production version for import elsewhere
export const widgets = new Widgets(api)

```

**widgets.test.ts**
```js
import { widgets } from './widgets'

describe("getWidgetName", () => {
  test("unknown widget returns 'Unknown Widget'", async () => {
    const fakeApi = {
      getWidget: async () => undefined
    }

    // construct the class with the test implementation
    const widgets = new Widgets(fakeApi)

    const name = await widgets.getWidgetName(42)

    expect(name).toEqual('Unknown Widget')
  })
})
```

## Pros



## Cons

On many projects, classes are not commonly used. If that is the case, consider using [closures](./02-closures).
