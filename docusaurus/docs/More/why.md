---
id: why
title: Why?
---

## Why use isolate-react?

Testing components and hooks in isolation should be fast and simple. This library makes it so.

Approaches that require a DOM emulator to test react components will always be slow and indirect. This library enables direct testing of components.

Other options that are fast, such as enzyme's `shallow`, rely on a poorly-maintained shallow renderer that is part of react. This renderer doesn't fully support hooks, so they don't support testing any functional component that uses useEffect or useContext.

Fast, isolated automated testing tools are useful for test-driven development practices.
