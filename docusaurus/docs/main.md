---
id: main
title: Overview
---

## Test-drive react components and hooks

### Flexible support for whatever level of testing you prefer:
- [x] Test custom hooks
- [x] Render a single component at a time (isolated/unit testing) 
- [x] Render multiple components toegether (integrated testing)

### Low-friction:
- [x] Works with any test runner that runs in node (jest, mocha, tape, tap, etc.)
- [x] Full hook support
- [x] Easy access to set context values needed for testing
- [x] No virtual DOM or other tools to install
- [x] Very fast

### Render react components in isolation
- [x] functional components that use hooks
- [x] class components


### Run your tests

`isolate-components` provides tools for testing your react components. It is not a test runner, nor an assertion library. It will work with any test runner that runs in nodejs like [mocha](https://mochajs.org/) or [jest](https://jestjs.io/) and any assertion library of your choice.

### Test of react hooks outside a component

Want to test your custom hooks? This library doesn't do that, but there is one that does:

If you want to test your custom react hooks outside of the component lifecycle, you should use [isolate-hooks](https://www.npmjs.com/package/isolate-hooks) -- this library is for testing your react functional components that _use_ hooks.

## Why does it exist?

Testing components in isolation should be fast and simple. This library makes it so.

Approaches that require a DOM emulator to test react components will always be slow and indirect. This library enables direct testing of components.

Other options that are fast, such as enzyme's `shallow`, rely on a poorly-maintained shallow renderer that is part of react. This renderer doesn't fully support hooks, so they don't support testing any functional component that uses useEffect or useContext.

Fast, isolated automated testing tools are useful for test-driven development practices.

## Installation

You should probably install this as a dev dependency.

`yarn add --dev isolate-components` or `npm install -D isolate-components`

## Usage

See [API documentation](https://davidmfoley.github.io/isolate-components/globals.html#isolatecomponent).




### Isolated component API

An isolated component has some methods to help exercise and inspect it.

See the [API docs](https://davidmfoley.github.io/isolate-components/api)

### Issues & Progress

See the [project tracker](https://github.com/davidmfoley/isolate-components/projects/1) for project progress.

File an [issue](https://github.com/davidmfoley/isolate-components/issues) if you have a suggestion or request.
