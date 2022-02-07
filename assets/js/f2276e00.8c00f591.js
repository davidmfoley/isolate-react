"use strict";(self.webpackChunkisolate_react_docs=self.webpackChunkisolate_react_docs||[]).push([[707],{3905:function(e,t,n){n.d(t,{Zo:function(){return c},kt:function(){return d}});var o=n(7294);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,o)}return n}function r(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,o,a=function(e,t){if(null==e)return{};var n,o,a={},i=Object.keys(e);for(o=0;o<i.length;o++)n=i[o],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(o=0;o<i.length;o++)n=i[o],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var l=o.createContext({}),p=function(e){var t=o.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):r(r({},t),e)),n},c=function(e){var t=p(e.components);return o.createElement(l.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return o.createElement(o.Fragment,{},t)}},m=o.forwardRef((function(e,t){var n=e.components,a=e.mdxType,i=e.originalType,l=e.parentName,c=s(e,["components","mdxType","originalType","parentName"]),m=p(n),d=a,f=m["".concat(l,".").concat(d)]||m[d]||u[d]||i;return n?o.createElement(f,r(r({ref:t},c),{},{components:n})):o.createElement(f,r({ref:t},c))}));function d(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var i=n.length,r=new Array(i);r[0]=m;var s={};for(var l in t)hasOwnProperty.call(t,l)&&(s[l]=t[l]);s.originalType=e,s.mdxType="string"==typeof e?e:a,r[1]=s;for(var p=2;p<i;p++)r[p]=n[p];return o.createElement.apply(null,r)}return o.createElement.apply(null,n)}m.displayName="MDXCreateElement"},9917:function(e,t,n){n.r(t),n.d(t,{frontMatter:function(){return s},contentTitle:function(){return l},metadata:function(){return p},toc:function(){return c},default:function(){return m}});var o=n(3117),a=n(102),i=(n(7294),n(3905)),r=["components"],s={title:"Test a single component"},l=void 0,p={unversionedId:"isolateComponent/test-a-single-component",id:"isolateComponent/test-a-single-component",title:"Test a single component",description:"The simplest use of isolateComponent is to test a single component in isolation.",source:"@site/docs/isolateComponent/02-test-a-single-component.md",sourceDirName:"isolateComponent",slug:"/isolateComponent/test-a-single-component",permalink:"/isolate-react/docs/isolateComponent/test-a-single-component",editUrl:"https://github.com/facebook/docusaurus/edit/main/website/docs/isolateComponent/02-test-a-single-component.md",tags:[],version:"current",sidebarPosition:2,frontMatter:{title:"Test a single component"},sidebar:"tutorialSidebar",previous:{title:"Overview",permalink:"/isolate-react/docs/isolateComponent/overview"},next:{title:"Test multiple components",permalink:"/isolate-react/docs/isolateComponent/test-multiple-components"}},c=[{value:"Step by step:",id:"step-by-step",children:[{value:"Step 1: isolate with <code>isolateComponent</code>:",id:"step-1-isolate-with-isolatecomponent",children:[],level:3},{value:"Step 2: Verify it starts out with a zero value",id:"step-2-verify-it-starts-out-with-a-zero-value",children:[],level:3},{value:"Step 3: Simulate interactions",id:"step-3-simulate-interactions",children:[],level:3},{value:"Step 4: Verify the updated content",id:"step-4-verify-the-updated-content",children:[],level:3}],level:2}],u={toc:c};function m(e){var t=e.components,n=(0,a.Z)(e,r);return(0,i.kt)("wrapper",(0,o.Z)({},u,n,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("p",null,"The simplest use of ",(0,i.kt)("inlineCode",{parentName:"p"},"isolateComponent")," is to test a single component in isolation."),(0,i.kt)("p",null,"Let's say we want to create a button that counts how many times it's been clicked and displays that count:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-javascript"},"import React, { useState } from 'react'\n\n// this is the component we want to test\nexport const CounterButton = () => {\n  const [count, setCount] = useState(0)\n  return (\n  <div>\n    <span className=\"count\">{count}</span>\n    <button type='button' onClick= {() => setCount(count => count + 1)}>+1</button>\n  </div>\n  )\n}\n")),(0,i.kt)("p",null,"We might test this by:"),(0,i.kt)("ol",null,(0,i.kt)("li",{parentName:"ol"},"Isolating the component using ",(0,i.kt)("inlineCode",{parentName:"li"},"isolateComponent")),(0,i.kt)("li",{parentName:"ol"},"Looking at the content rendered by the isolated component to see that it is 0."),(0,i.kt)("li",{parentName:"ol"},"Simulating clicks on the button"),(0,i.kt)("li",{parentName:"ol"},"Checking the content again, as in step 2.")),(0,i.kt)("p",null,"Here's how that would look, using jest as the test runner:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-javascript"},"import { isolateComponent } from 'isolate-react'\nimport { CounterButton } from './CounterButton'\n\ntest('starts at zero, then increments when clicked', () => {\n  // 1. Isolate\n  const button = isolateComponent(<CounterButton />)\n\n  // 2. Verify it starts with zero.\n  expect(button.content()).toContain('0')\n\n  // 3. Simulate three clicks\n  button.findOne('button').props.onClick()\n  button.findOne('button').props.onClick()\n  button.findOne('button').props.onClick()\n\n  // 4. Verify it is now 3\n  expect(button.content()).toContain('3')\n})\n")),(0,i.kt)("h2",{id:"step-by-step"},"Step by step:"),(0,i.kt)("h3",{id:"step-1-isolate-with-isolatecomponent"},"Step 1: isolate with ",(0,i.kt)("inlineCode",{parentName:"h3"},"isolateComponent"),":"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-javascript"},"  const button = isolateComponent(<CounterButton />)\n")),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"isolateComponent")," returns an IsolatedComponent. Check out ",(0,i.kt)("a",{parentName:"p",href:"/isolate-react/docs/isolateComponent/api"},"the api documentation")," for more information."),(0,i.kt)("h3",{id:"step-2-verify-it-starts-out-with-a-zero-value"},"Step 2: Verify it starts out with a zero value"),(0,i.kt)("p",null,"There are a few different ways to explore the isolated component's contents. "),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"content()")," returns all of the inner content of the component:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-javascript"},"  expect(button.content()).toContain('0')\n")),(0,i.kt)("p",null,"We can also find the rendered ",(0,i.kt)("inlineCode",{parentName:"p"},"span")," and check its content:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-javascript"},"  // find by element type\n  expect(button.findOne('span').content()).toEqual('0')\n  // find by className\n  expect(button.findOne('.count').content()).toEqual('0')\n  // find by element type and class name\n  expect(button.findOne('span.count').content()).toEqual('0')\n")),(0,i.kt)("p",null,"There are a few other ways to explore the contents of an isolated component. Two of the most useful are ",(0,i.kt)("inlineCode",{parentName:"p"},"findAll()")," and ",(0,i.kt)("inlineCode",{parentName:"p"},"exists()")),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"findOne"),", ",(0,i.kt)("inlineCode",{parentName:"p"},"findAll"),", and ",(0,i.kt)("inlineCode",{parentName:"p"},"exists")," each take a ",(0,i.kt)("a",{parentName:"p",href:"/isolate-react/docs/isolateComponent/api"},"Selector"),". A Selector can be a string that supports a subset of CSS-style matchers. It can also be a component reference, which will be discussed later in this guide."),(0,i.kt)("h3",{id:"step-3-simulate-interactions"},"Step 3: Simulate interactions"),(0,i.kt)("p",null,"Simulate interactions by using ",(0,i.kt)("inlineCode",{parentName:"p"},"findOne")," or ",(0,i.kt)("inlineCode",{parentName:"p"},"findAll"),' to find rendered components or tags (called "nodes") and interacting with their props:'),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-javascript"},"  button.findOne('button').props.onClick()\n  button.findOne('button').props.onClick()\n  button.findOne('button').props.onClick()\n")),(0,i.kt)("h3",{id:"step-4-verify-the-updated-content"},"Step 4: Verify the updated content"),(0,i.kt)("p",null,"Again, there are a few different ways to do this:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-javascript"},"  expect(button.content()).toContain('3')\n\n  expect(button.findOne('span.count').content()).toEqual('0')\n")))}m.isMDXComponent=!0}}]);