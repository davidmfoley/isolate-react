---
title: React props
---

## Description

Add services to each function that uses them as arguments.

In production, use default prop value to bring in the production implementation.

In tests, pass in a test implementation as a prop.


## Example

**api.js**

```javascript
// production api implementation
export const api = {
  getWidget: (id) => { ... }
}
```

**WidgetName.jsx**
```javascript
import { api } from './api'
import React, { useEffect, useState } from 'react'

const WidgetName = ({
  widgetApi=api, // default value is the "real" api
  id
}) => {
  const [name, setName] = useState('')

  useEffect(() => {
    widgetApi.getWidget(id).then(widget => setName(widget.name))
  }, [id])

  return <span>{name}</span>
}

```

**WidgetName.test.jsx**

```javascript
import { widgets } from './widgets'

describe("WidgetName", () => {
  test("unknown widget returns 'Unknown Widget'", () => {
    const fakeApi = {
      getWidget: async () => undefined
    }

    const widgetComponent = isolateComponent(<WidgetName widgetApi={fakeApi} widgetId={42} />)

    await Promise.resolve()

    expect(widgetComponent.findOne('span').content()).toEqual('Unknown Widget')
  })
})
```

## Notes

This is a react-specific technique.

This is very similar to [default arguments](./default-arguments)
