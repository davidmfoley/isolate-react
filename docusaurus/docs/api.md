---
title: API
---

`isolate-react` exposes three functions: `isolateHook`, `isolateComponent`, and `isolateComponentTree`.

Import them as follows:

```javascript
import { isolateComponent, isolateComponentTree, isolateHook } from 'isolate-react'
```

Each function serves a different purpose:

- `isolateHook` is used for testing custom hooks.
- `isolateComponent` is used for testing a single compoment *without* rendering its child components, similar to "shallow" rendering with a tool like enzyme.
- `isolateComponentTree` is used for testing a compoment *with* all of its children.

Learn about testing components:

* [Overview and Examples](./Testing Components/01-overview.md)
* [API](./Testing Components/api.md)

Learn about testing hooks:

* [Overview and Examples](./Testing Hooks/01-overview.md)
* [API](./Testing Hooks/api.md)
