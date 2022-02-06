---
id: compare
title: Comparison to other tools
---

# How does this compare to (insert tool here)?

## enzyme shallow

Enzyme shallow works great for react class components but doesn't support the full set of hooks necessary to build stateful functional components.

## enzyme mount and react-testing-library

These tools allow testing components that use hooks but they:

1. Require a dom emulator. This makes tests run _very_ slow compared to isolate-components.
1. Require testing _all_ rendered components. This is _sometimes_ desirable but often is not. isolate-components allows you to test a single component in isolation, or to test multiple components together -- it's up to you.

## cypress, selenium, etc.

Cypress and similar tools are used for _acceptance testing_. `isolate-components` facilitates isolated testing of a single component (_unit testing_) or a small set of components. Acceptance testing is orthogonal to unit testing -- you can do either or both.

