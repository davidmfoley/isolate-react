---
title: Overview
---

`isolate-react` provides two functions for testing react components:

- `isolateComponent` renders a react component *but does not render its children*.
- `isolateComponentTree` renders a react component *and also renders any child components*.

Both `isolateComponent` and `isolateComponentTree` return the same thing: an [IsolatedComponent](./api#IsolatedComponent) that provides methods for inspecting and interacting with the elements rendered by the component.
 
The next couple of pages show examples of each.


### [API Documentation](./api.md)

