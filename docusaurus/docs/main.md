---
id: main
title: Overview
---

## Test-drive react components and hooks

isolate-react is the missing tool for test-driving your react components.

It's focused on speed and simplicity, has zero dependencies, doesn't require a DOM emulator, and supports any test runner.

### Flexible support for whatever level of testing you prefer:
- [x] Test custom hooks
- [x] Render a single component at a time (isolated/unit testing) 
- [x] Render multiple components together (integrated testing)

### Low-friction:
- [x] Works with any test runner that runs in node (jest, mocha, tape, tap, etc.)
- [x] Full hook support
- [x] Easy access to set context values needed for testing
- [x] No virtual DOM or other tools to install
- [x] Very fast

## 
`isolate-react` exposes two functions: `isolateHook` and `isolateComponent`

Import them as follows:

```javascript
import { isolateComponent, isolateHook } from 'isolate-react'
```

`isolateComponent` is used to isolate a react component for testing. 

More about `isolateComponent`:

* [Overview and Examples](./isolateComponent/01-overview.md)
* [API](./isolateComponent/api.md)

`isolateHook` is used to isolate a custom hook for testing. 

More about `isolateHook`:

* [Overview and Examples](./isolateHook/01-overview.md)
* [API](./isolateHook/api.md)
## Usage

See the [API documentation](./api.md) for usage, or jump right into the documentation for [isolateComponent](./isolateComponent/01-overview.md) or [isolateHook](./isolateHook/01-overview.md)

### Issues & Progress

See the [project tracker](https://github.com/davidmfoley/isolate-react/projects/1) for project progress.

File an [issue](https://github.com/davidmfoley/isolate-react/issues) if you have a suggestion or request.
