"use strict";(self.webpackChunkisolate_react_docs=self.webpackChunkisolate_react_docs||[]).push([[53],{1109:function(e){e.exports=JSON.parse('{"pluginId":"default","version":"current","label":"Next","banner":null,"badge":false,"className":"docs-version-current","isLast":true,"docsSidebars":{"tutorialSidebar":[{"type":"link","label":"API","href":"/isolate-react/api","docId":"api"},{"type":"link","label":"Installation","href":"/isolate-react/installation","docId":"installation"},{"type":"link","label":"isolate-react","href":"/isolate-react/","docId":"main"},{"type":"category","label":"More","collapsible":true,"collapsed":true,"items":[{"type":"link","label":"Comparison to other tools","href":"/isolate-react/More/compared-to","docId":"More/compared-to"},{"type":"link","label":"Why?","href":"/isolate-react/More/why","docId":"More/why"},{"type":"category","label":"Dependencies","collapsible":true,"collapsed":true,"items":[{"type":"link","label":"Dependencies","href":"/isolate-react/More/Dependencies/overview","docId":"More/Dependencies/overview"},{"type":"link","label":"The best dependency is no dependency","href":"/isolate-react/More/Dependencies/dependency-removal","docId":"More/Dependencies/dependency-removal"},{"type":"link","label":"Closures","href":"/isolate-react/More/Dependencies/closures","docId":"More/Dependencies/closures"},{"type":"link","label":"Service Locator","href":"/isolate-react/More/Dependencies/service-locator","docId":"More/Dependencies/service-locator"},{"type":"link","label":"Default arguments","href":"/isolate-react/More/Dependencies/default-arguments","docId":"More/Dependencies/default-arguments"},{"type":"link","label":"Class constructors","href":"/isolate-react/More/Dependencies/class-constructors","docId":"More/Dependencies/class-constructors"},{"type":"link","label":"Setter function","href":"/isolate-react/More/Dependencies/setters","docId":"More/Dependencies/setters"},{"type":"link","label":"React props","href":"/isolate-react/More/Dependencies/react-props","docId":"More/Dependencies/react-props"},{"type":"link","label":"React context","href":"/isolate-react/More/Dependencies/react-context","docId":"More/Dependencies/react-context"},{"type":"link","label":"Code smell - Mocking imports (jest.mock)","href":"/isolate-react/More/Dependencies/file-mocks","docId":"More/Dependencies/file-mocks"},{"type":"link","label":"Code Smell - Replace existing method (jest.spyOn)","href":"/isolate-react/More/Dependencies/replace-method-on-existing-object","docId":"More/Dependencies/replace-method-on-existing-object"}]}]},{"type":"category","label":"Testing Components","collapsible":true,"collapsed":true,"items":[{"type":"link","label":"Overview","href":"/isolate-react/Testing Components/overview","docId":"Testing Components/overview"},{"type":"link","label":"Anatomy of a component test","href":"/isolate-react/Testing Components/anatomy-of-a-test","docId":"Testing Components/anatomy-of-a-test"},{"type":"link","label":"isolateComponent - Test a single component","href":"/isolate-react/Testing Components/isolateComponent","docId":"Testing Components/isolateComponent"},{"type":"link","label":"isolateComponentTree - Test multiple components","href":"/isolate-react/Testing Components/isolateComponentTree","docId":"Testing Components/isolateComponentTree"},{"type":"link","label":"Testing useContext","href":"/isolate-react/Testing Components/testing-with-react-context","docId":"Testing Components/testing-with-react-context"},{"type":"link","label":"Testing effects","href":"/isolate-react/Testing Components/testing-effects","docId":"Testing Components/testing-effects"},{"type":"link","label":"Testing component unmount","href":"/isolate-react/Testing Components/testing-component-unmount","docId":"Testing Components/testing-component-unmount"},{"type":"link","label":"Working with refs","href":"/isolate-react/Testing Components/refs","docId":"Testing Components/refs"},{"type":"link","label":"API","href":"/isolate-react/Testing Components/api","docId":"Testing Components/api"}]},{"type":"category","label":"Testing Hooks","collapsible":true,"collapsed":true,"items":[{"type":"link","label":"Overview","href":"/isolate-react/Testing Hooks/overview","docId":"Testing Hooks/overview"},{"type":"link","label":"Hooks with effects","href":"/isolate-react/Testing Hooks/testing-effects","docId":"Testing Hooks/testing-effects"},{"type":"link","label":"Testing context","href":"/isolate-react/Testing Hooks/testing-context","docId":"Testing Hooks/testing-context"},{"type":"link","label":"Testing asynchronous hooks","href":"/isolate-react/Testing Hooks/testing-async-hooks","docId":"Testing Hooks/testing-async-hooks"},{"type":"link","label":"API","href":"/isolate-react/Testing Hooks/api","docId":"Testing Hooks/api"}]}]},"docs":{"api":{"id":"api","title":"API","description":"isolate-react exposes three functions: isolateHook, isolateComponent, and isolateComponentTree.","sidebar":"tutorialSidebar"},"installation":{"id":"installation","title":"Installation","description":"You probably want to install isolate-react as a dev dependency into your project that uses react:","sidebar":"tutorialSidebar"},"main":{"id":"main","title":"isolate-react","description":"The missing tool for test-driving react hooks and components","sidebar":"tutorialSidebar"},"More/compared-to":{"id":"More/compared-to","title":"Comparison to other tools","description":"How does this compare to (insert tool here)?","sidebar":"tutorialSidebar"},"More/Dependencies/class-constructors":{"id":"More/Dependencies/class-constructors","title":"Class constructors","description":"Description","sidebar":"tutorialSidebar"},"More/Dependencies/closures":{"id":"More/Dependencies/closures","title":"Closures","description":"Description","sidebar":"tutorialSidebar"},"More/Dependencies/default-arguments":{"id":"More/Dependencies/default-arguments","title":"Default arguments","description":"Description","sidebar":"tutorialSidebar"},"More/Dependencies/dependency-removal":{"id":"More/Dependencies/dependency-removal","title":"The best dependency is no dependency","description":"Before we get into all of the techniques we can use to invert a dependency, let\'s look at the most powerful technique we have for dealing with unruly dependencies: get rid of them.","sidebar":"tutorialSidebar"},"More/Dependencies/file-mocks":{"id":"More/Dependencies/file-mocks","title":"Mocking imports (jest.mock)","description":"Don\'t use file mocks","sidebar":"tutorialSidebar"},"More/Dependencies/overview":{"id":"More/Dependencies/overview","title":"Dependencies","description":"A guide to building software without losing your mind.","sidebar":"tutorialSidebar"},"More/Dependencies/react-context":{"id":"More/Dependencies/react-context","title":"React context","description":"Description","sidebar":"tutorialSidebar"},"More/Dependencies/react-props":{"id":"More/Dependencies/react-props","title":"React props","description":"Description","sidebar":"tutorialSidebar"},"More/Dependencies/replace-method-on-existing-object":{"id":"More/Dependencies/replace-method-on-existing-object","title":"Replace existing method (jest.spyOn)","description":"Don\'t use jest.spyOn","sidebar":"tutorialSidebar"},"More/Dependencies/service-locator":{"id":"More/Dependencies/service-locator","title":"Service Locator","description":"Description","sidebar":"tutorialSidebar"},"More/Dependencies/setters":{"id":"More/Dependencies/setters","title":"Setter function","description":"Description","sidebar":"tutorialSidebar"},"More/why":{"id":"More/why","title":"Why?","description":"Why use isolate-react?","sidebar":"tutorialSidebar"},"Testing Components/anatomy-of-a-test":{"id":"Testing Components/anatomy-of-a-test","title":"Anatomy of a component test","description":"Whether using isolateComponent, or isolateComponentTree, most component tests follow a similar pattern:","sidebar":"tutorialSidebar"},"Testing Components/api":{"id":"Testing Components/api","title":"API","description":"isolateComponent()","sidebar":"tutorialSidebar"},"Testing Components/isolateComponent":{"id":"Testing Components/isolateComponent","title":"isolateComponent","description":"Test a single component","sidebar":"tutorialSidebar"},"Testing Components/isolateComponentTree":{"id":"Testing Components/isolateComponentTree","title":"isolateComponentTree","description":"Test a component with all of its children","sidebar":"tutorialSidebar"},"Testing Components/overview":{"id":"Testing Components/overview","title":"Overview","description":"isolate-react provides two functions for testing react components:","sidebar":"tutorialSidebar"},"Testing Components/refs":{"id":"Testing Components/refs","title":"Working with refs","description":"Use setRef to set the value of a ref for testing.","sidebar":"tutorialSidebar"},"Testing Components/testing-component-unmount":{"id":"Testing Components/testing-component-unmount","title":"Testing component unmount","description":"The cleanup() method unmounts your component and any inlined components.","sidebar":"tutorialSidebar"},"Testing Components/testing-effects":{"id":"Testing Components/testing-effects","title":"Testing effects","description":"","sidebar":"tutorialSidebar"},"Testing Components/testing-with-react-context":{"id":"Testing Components/testing-with-react-context","title":"Testing useContext","description":"Two methods of setting context are provided, and they work the same for isolateComponent and isolateComponentTree:","sidebar":"tutorialSidebar"},"Testing Hooks/api":{"id":"Testing Hooks/api","title":"API","description":"isolateHook(hookToIsolate)","sidebar":"tutorialSidebar"},"Testing Hooks/overview":{"id":"Testing Hooks/overview","title":"Overview","description":"isolateHook lets you test your custom react hooks quickly and simply.","sidebar":"tutorialSidebar"},"Testing Hooks/testing-async-hooks":{"id":"Testing Hooks/testing-async-hooks","title":"Testing asynchronous hooks","description":"","sidebar":"tutorialSidebar"},"Testing Hooks/testing-context":{"id":"Testing Hooks/testing-context","title":"Testing context","description":"Testing hooks that use useContextis simple with isolateHook.","sidebar":"tutorialSidebar"},"Testing Hooks/testing-effects":{"id":"Testing Hooks/testing-effects","title":"Hooks with effects","description":"Simulating hook cleanup","sidebar":"tutorialSidebar"}}}')}}]);