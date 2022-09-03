---
title: Closures
---

## Description

Create a factory function that takes the services needed and returns a function or object that encloses those services.

In production code, use the real services to construct the module, by either:
- Creating and exporting the constructed production implementation alongside the factory function
- Calling the factory function in application code to create the production implementation

In tests, configure the dependencies for testing by calling the factory function with test-friendly values.

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

// factory function
export const makeWidgets = (widgetApi) => {

  // return an object that uses the api 
  return {
    getWidgetName: async (widgetId) => {
      const widget = await widgetApi.getWidget(widgetId);
      if (!widget) return "Unknown Widget"
      return widget.name
    }
  }
}

// export the production version, this is imported by other modules
export const widgets = makeWidgets(api);
```

**widgets.test.ts**
```js
import { makeWidgets } from './widgets'

describe("getWidgetName", () => {
  test("unknown widget returns 'Unknown Widget'", () => {
    const fakeApi = {
      getWidget: async () => undefined
    }

    // use the factory to make the object we want to test, with a fake api implementation
    const widgets = makeWidgets(fakeApi)

    const name = await widgets.getWidgetName(42)

    expect(name).toEqual('Unknown Widget')
  })
})
```

## Notes

This is a general technique that can be used anywhere, not only in react-aware code.

This is very similar to using classes that take dependencies as constructor objects.

