---
title: Default arguments
---

## Description

Add services to each function that uses them as arguments.

In production, use default argument values to bring in the production implementations.

In tests, pass in test implementations.

## Notes

This is a general technique that can be used anywhere, not only in react-aware code.

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

export const widgets = {
  getWidgetName: async (widgetId, widgetApi = api) => {
    const widget = await widgetApi.getWidget(widgetId);
    if (!widget) return "Unknown Widget"
    return widget.name
  }
}

```

**widgets.test.ts**
```js
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

## Pros



## Cons

