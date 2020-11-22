# isolate-components quickstart

## Assumptions

This guide assumes that you already have a react project set up that you would like to add isolate-components to. If you don't have an existing project, or you want to try out isolated-components in a new project, you can use create-react-app to set one up.

### Install isolate-components

You should install isolate-components as a dev dependency.

If your project uses the yarn package manager, run:

`yarn add --dev isolate-components`

If your project uses npm:

`npm install -D isolate-components`

### Test runner

A test runner runs your tests and tells you their results.

`isolate-components` works with any node.js test runner. Jest is the most popular test runner and comes with create-react-app. Mocha is another popular test runner that can also be used with isolate-components.

This quickstart will assume you are using jest. If you are using a different test runner, isolate-components will work the same, but you will have slightly different test syntax.

If your project doesn't already have jest, you can install the `jest` package with yarn or npm, as shown above.

### Writing a test

Let's write a test and make it pass.
