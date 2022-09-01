"use strict";(self.webpackChunkisolate_react_docs=self.webpackChunkisolate_react_docs||[]).push([[17],{3905:function(e,t,n){n.d(t,{Zo:function(){return l},kt:function(){return m}});var o=n(7294);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,o)}return n}function a(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,o,r=function(e,t){if(null==e)return{};var n,o,r={},i=Object.keys(e);for(o=0;o<i.length;o++)n=i[o],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(o=0;o<i.length;o++)n=i[o],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var c=o.createContext({}),u=function(e){var t=o.useContext(c),n=t;return e&&(n="function"==typeof e?e(t):a(a({},t),e)),n},l=function(e){var t=u(e.components);return o.createElement(c.Provider,{value:t},e.children)},p={inlineCode:"code",wrapper:function(e){var t=e.children;return o.createElement(o.Fragment,{},t)}},f=o.forwardRef((function(e,t){var n=e.components,r=e.mdxType,i=e.originalType,c=e.parentName,l=s(e,["components","mdxType","originalType","parentName"]),f=u(n),m=r,d=f["".concat(c,".").concat(m)]||f[m]||p[m]||i;return n?o.createElement(d,a(a({ref:t},l),{},{components:n})):o.createElement(d,a({ref:t},l))}));function m(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var i=n.length,a=new Array(i);a[0]=f;var s={};for(var c in t)hasOwnProperty.call(t,c)&&(s[c]=t[c]);s.originalType=e,s.mdxType="string"==typeof e?e:r,a[1]=s;for(var u=2;u<i;u++)a[u]=n[u];return o.createElement.apply(null,a)}return o.createElement.apply(null,n)}f.displayName="MDXCreateElement"},2135:function(e,t,n){n.r(t),n.d(t,{frontMatter:function(){return s},contentTitle:function(){return c},metadata:function(){return u},toc:function(){return l},default:function(){return f}});var o=n(3117),r=n(102),i=(n(7294),n(3905)),a=["components"],s={title:"Overview"},c=void 0,u={unversionedId:"Testing Hooks/overview",id:"Testing Hooks/overview",title:"Overview",description:"isolateHook lets you test your custom react hooks quickly and simply.",source:"@site/docs/Testing Hooks/01-overview.md",sourceDirName:"Testing Hooks",slug:"/Testing Hooks/overview",permalink:"/isolate-react/docs/Testing Hooks/overview",editUrl:"https://github.com/facebook/docusaurus/edit/main/website/docs/Testing Hooks/01-overview.md",tags:[],version:"current",sidebarPosition:1,frontMatter:{title:"Overview"},sidebar:"tutorialSidebar",previous:{title:"API",permalink:"/isolate-react/docs/Testing Components/api"},next:{title:"Hooks with effects",permalink:"/isolate-react/docs/Testing Hooks/testing-effects"}},l=[],p={toc:l};function f(e){var t=e.components,n=(0,r.Z)(e,a);return(0,i.kt)("wrapper",(0,o.Z)({},p,n,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"isolateHook")," lets you test your custom react hooks quickly and simply."),(0,i.kt)("p",null,"Here's a simple example: "),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-javascript"},"import { useState } from 'react'\nimport { isolateHook } from 'isolate-react'\n\nconst useCounter = () => {\n  const [count, setCount] = useState(0)\n\n  return {\n    count,\n    increment: () => setCount(x => x + 1)\n  }\n}\n\n// isolateHook returns a function with the same arguments \n// and return type as the passed hook\nconst isolated = isolateHook(useCounter)\n\nconsole.log(isolated().count) // => 0\n\nisolated().increment()\n\nconsole.log(isolated().count) // => 1\n\n// isolated hooks have some other helper methods:\nconsole.log(isolated.currentValue().count) // => 1\n")),(0,i.kt)("p",null,"For more details see the ",(0,i.kt)("a",{parentName:"p",href:"/isolate-react/docs/Testing%20Hooks/api"},"isolateHook API Documentation")))}f.isMDXComponent=!0}}]);