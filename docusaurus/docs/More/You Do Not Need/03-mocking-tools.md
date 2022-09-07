---
title: You don't need a fancy mocking tool
---

### This is a work in progress!

## What we talk about when we talk about mocks

In automated tests, sometimes we use helper objects or functions that help us test *other* objects or functions. These helpers are often (semi-accurately) called "mocks".

The more general term for this type of object is "test double". Technically, a "mock" is a specific type of test double. However usage of mocks (in the technical sense) is rare in practice, in javascript. 
Usage of the name "mock", as a synonym for "test double", probably comes from the names of many of the early tools, such as "JMock" for Java and "Rhino Mocks". 

Anyway, human language is even more malleable than Javascript, so just be warned that, in these writings, I will usually use a term like "fake" or "test double" in the general case, rather than the (imprecise) use of "mock" as a general term for all fake objects used in tests.

## Why do we even have mocking tools?

At the time that TDD was gaining popularity, Java and C# did not have many built-in dynamic features, so tools that provide the developer the ability to easily create an object for testing allowed for exercising modules in tests in ways that would otherwise be difficult.

However, this power is not without cost. Using a tool that makes it easy to test a module that has many dependencies can make it harder to see the cost of those dependencies.
Usually, in my experience, code that is hard to test is also hard to understand and ultimately, hard to make correct.
Additionally, usually when we say that code is "hard to test" what we mean is that it is difficult to set up the *dependencies* required to exercise that code.
When testing a complex module, each test that does complex setup of dependencies makes it more difficult to refactor the dependencies of the code being tested, since that would now require changing the tests as well. It also makes the tests more difficult to understand.

## Javascript is malleable

The dynamic nature of Javascript (and typescript) gives us many more options for 

## What 

### Stub
#### Return known values from a function to facilitate testing

### Spy
#### Spy on calls to a function and assert that it was called correctly


