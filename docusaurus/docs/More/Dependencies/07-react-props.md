---
title: React props
---

## Description

Add services to each function that uses them as arguments.

In production, use default prop value to bring in the production implementation.

In tests, pass in a test implementation as a prop.

## Notes

This is a react-specific technique.

## Example

**api.ts**

```js
// production api implementation
export const api = {
  getWidget: (id) => { ... }
}
```

**WidgetName.ts**
```js
import { api } from './api'
import React, { useEffect, useState } from 'react'

const WidgetName = ({
  widgetApi=api,
  id
}) => {
  const [name, setName] = useState('')
  useEffect(() => {
    
  }, [id])
}

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

