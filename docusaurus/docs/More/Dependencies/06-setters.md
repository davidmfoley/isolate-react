---
title: Setter function
---

## Description

Store a reference to a dependency in a private variable and provide a setter function that sets the value of the variable.

In production, there are a few options:

1. Default the value of the variable to the production implementation
1. Default the value of the variable to a test or no-op implementation
1. Upon startup, construct the production implementations and invoke the setters on each module that needs them.

In tests, invoke the setter with a test implementation, often a fake or a stub.

## Example

**api.js**

```js
// production api implementation
export const api = {
  getWidget: (id) => { ... }
}
```

**widgets.js**
```js
let widgetApi;

export const setApi = (implementation) => {
  widgetApi = implementation
}

export const widgets = {
  getWidgetName: async (widgetId) => {
    const widget = await widgetApi.getWidget(widgetId);
    if (!widget) return "Unknown Widget"
    return widget.name
  }
}

```

**widgets.test.js**
```js
import { widgets, setApi } from './widgets'

describe("getWidgetName", () => {
  test("unknown widget returns 'Unknown Widget'", () => {
    const fakeApi = {
      getWidget: async () => undefined
    }

    // use the test implementation
    setApi(fakeApi)

    expect(getWidgetName(42, fakeApi)).toEqual('Unknown Widget')
  })
})
```

## Notes

This is a general technique that can be used anywhere, not only in react-aware code.

## Pros

- Explicit and simple to implement
- Works well for optional or occasionally overriden dependencies

## Cons

- If there is no default value, objects can be in invalid state until their setters have been invoked
- Can lead to tricky/verbose wiring code to set initial dependencies upon app startup

