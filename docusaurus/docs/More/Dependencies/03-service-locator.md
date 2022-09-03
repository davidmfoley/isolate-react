---
title: Service Locator
---

## Description

Rather than importing a module(service) directly in the module that consumes it, "locate it" via a function that returns the implementation.

In production code, configure the locator to return the production implementation. This can be done either by defaulting the locator to the production implementation, or by setting up each service locator when the app starts up.

In tests, set up the locator to return a different implementation as needed.

## Example

**api.ts**

```js
// current instance of the service
const _api;

// Set the service
export const setApi = (api) => { _api = api };

// This is the "service locator"
export const getApi = () => _api;
```

**widgets.ts**
```js
import { getApi } from './api'

export const widgets = {
  getWidgetName: async (widgetId) => {
    const api = getApi();
    const widget = await api.getWidget(widgetId);
    if (!widget) return "Unknown Widget"
    return widget.name
  }
}
```

**widgets.test.ts**
```js
import { setApi } from './api'
import { widgets } from './widgets'

describe("getWidgetName", () => {
  test("unknown widget returns 'Unknown Widget'", () => {
    // Test "api" that always returns undefined
    const fakeApi = {
      getWidget: async () => undefined
    }

    setApi(fakeApi)

    expect(widgets.getWidgetName(42)).toEqual('Unknown Widget')
  })
})
```

## Notes

This is a general technique that can be used anywhere, not only in react.

Sometimes many services are grouped together in a single object. This is sometimes called a "Service Registry".

When we use Service Locator, we add an additional dependency on the locator to each place that uses the service. This complicates the code.

