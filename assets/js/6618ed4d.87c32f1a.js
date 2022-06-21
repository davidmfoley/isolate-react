"use strict";(self.webpackChunkisolate_react_docs=self.webpackChunkisolate_react_docs||[]).push([[373],{3905:function(e,t,o){o.d(t,{Zo:function(){return u},kt:function(){return m}});var n=o(7294);function r(e,t,o){return t in e?Object.defineProperty(e,t,{value:o,enumerable:!0,configurable:!0,writable:!0}):e[t]=o,e}function i(e,t){var o=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),o.push.apply(o,n)}return o}function a(e){for(var t=1;t<arguments.length;t++){var o=null!=arguments[t]?arguments[t]:{};t%2?i(Object(o),!0).forEach((function(t){r(e,t,o[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(o)):i(Object(o)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(o,t))}))}return e}function c(e,t){if(null==e)return{};var o,n,r=function(e,t){if(null==e)return{};var o,n,r={},i=Object.keys(e);for(n=0;n<i.length;n++)o=i[n],t.indexOf(o)>=0||(r[o]=e[o]);return r}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(n=0;n<i.length;n++)o=i[n],t.indexOf(o)>=0||Object.prototype.propertyIsEnumerable.call(e,o)&&(r[o]=e[o])}return r}var s=n.createContext({}),l=function(e){var t=n.useContext(s),o=t;return e&&(o="function"==typeof e?e(t):a(a({},t),e)),o},u=function(e){var t=l(e.components);return n.createElement(s.Provider,{value:t},e.children)},p={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},f=n.forwardRef((function(e,t){var o=e.components,r=e.mdxType,i=e.originalType,s=e.parentName,u=c(e,["components","mdxType","originalType","parentName"]),f=l(o),m=r,d=f["".concat(s,".").concat(m)]||f[m]||p[m]||i;return o?n.createElement(d,a(a({ref:t},u),{},{components:o})):n.createElement(d,a({ref:t},u))}));function m(e,t){var o=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var i=o.length,a=new Array(i);a[0]=f;var c={};for(var s in t)hasOwnProperty.call(t,s)&&(c[s]=t[s]);c.originalType=e,c.mdxType="string"==typeof e?e:r,a[1]=c;for(var l=2;l<i;l++)a[l]=o[l];return n.createElement.apply(null,a)}return n.createElement.apply(null,o)}f.displayName="MDXCreateElement"},1833:function(e,t,o){o.r(t),o.d(t,{frontMatter:function(){return c},contentTitle:function(){return s},metadata:function(){return l},toc:function(){return u},default:function(){return f}});var n=o(3117),r=o(102),i=(o(7294),o(3905)),a=["components"],c={title:"Overview"},s=void 0,l={unversionedId:"isolateHook/overview",id:"isolateHook/overview",title:"Overview",description:"isolateHook lets you test your custom react hooks quickly and simply.",source:"@site/docs/isolateHook/01-overview.md",sourceDirName:"isolateHook",slug:"/isolateHook/overview",permalink:"/isolate-react/docs/isolateHook/overview",editUrl:"https://github.com/facebook/docusaurus/edit/main/website/docs/isolateHook/01-overview.md",tags:[],version:"current",sidebarPosition:1,frontMatter:{title:"Overview"},sidebar:"tutorialSidebar",previous:{title:"API",permalink:"/isolate-react/docs/isolateComponent/api"},next:{title:"Testing effects",permalink:"/isolate-react/docs/isolateHook/testing-effects"}},u=[],p={toc:u};function f(e){var t=e.components,o=(0,r.Z)(e,a);return(0,i.kt)("wrapper",(0,n.Z)({},p,o,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"isolateHook")," lets you test your custom react hooks quickly and simply."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-javascript"},"import { isolateHook } from 'isolate-react'\n\nconst useCounter = () => {\n  const [count, setCount] = useState(0)\n\n  return {\n    count,\n    increment: () => setCount(x => x + 1)\n  }\n}\n\nconst isolated = isolateHook(useCounter)\n\nconsole.log(isolated().count) // => 0\n\nisolated().increment()\n\nconsole.log(isolated().count) // => 1\n")),(0,i.kt)("p",null,"For more details see the ",(0,i.kt)("a",{parentName:"p",href:"/isolate-react/docs/isolateHook/api"},"isolateHook API Documentation")))}f.isMDXComponent=!0}}]);