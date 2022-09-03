---
title: React context
---

## Description

Create a react context that holds the dependency.

The context can have a default value, or it can be set via a provider in the production application.

Access the dependency via `useContext`.

The context can live with either the dependent code, or the dependency.

If you choose to locate the context with the dependency, you may wish to export a named wrapper that invokes useContext.

In tests, use `setContext` or `withContext` to set the value of the context to the test implementation.

## Notes

This is a react-specific technique.

## Example

**api.js**
```javascript
import { createContext, useContext } from 'react'

// production api implementation
export const api = {
  getWidget: (id) => { ... }
}

export const ApiContext = createContext(api)

// This hook is used anywhere api is needed
export const useApi = () => useContext(ApiContext)
```

**WidgetName.jsx**
```javascript
import { useApi } from './api'
import React, { useEffect, useState } from 'react'

const WidgetName = ({
  id
}) => {
  const api = useApi()

  const [name, setName] = useState('')

  useEffect(() => {
    api.getWidget(id).then(widget => setName(widget ? widget.name: 'Unkonwn Widget'))
  }, [id])

  return <span>{name}</span>
}

```

**WidgetName.test.jsx**

```javascript
import { isolateComponent } from 'isolate-react'
import { ApiContext } from './api'
import { widgets } from './widgets'

describe("WidgetName", () => {
  test("unknown widget returns 'Unknown Widget'", async () => {
    const fakeApi = {
      getWidget: async () => undefined
    }

    const isolateWithFakeApi = isolateComponent.withContext(ApiContext, fakeApi)

    const widgetComponent = isolateWithFakeApi(<WidgetName widgetApi={fakeApi} widgetId={42} />)

    // Wait for the api promise and update the component
    await widgetComponent.waitForRender()

    expect(widgetComponent.findOne('span').content()).toEqual('Unknown Widget')
  })
})
```

