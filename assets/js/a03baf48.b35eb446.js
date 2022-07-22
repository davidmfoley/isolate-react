"use strict";(self.webpackChunkisolate_react_docs=self.webpackChunkisolate_react_docs||[]).push([[499],{3905:function(e,t,n){n.d(t,{Zo:function(){return u},kt:function(){return m}});var o=n(7294);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,o)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function c(e,t){if(null==e)return{};var n,o,r=function(e,t){if(null==e)return{};var n,o,r={},a=Object.keys(e);for(o=0;o<a.length;o++)n=a[o],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(o=0;o<a.length;o++)n=a[o],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var l=o.createContext({}),s=function(e){var t=o.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},u=function(e){var t=s(e.components);return o.createElement(l.Provider,{value:t},e.children)},p={inlineCode:"code",wrapper:function(e){var t=e.children;return o.createElement(o.Fragment,{},t)}},f=o.forwardRef((function(e,t){var n=e.components,r=e.mdxType,a=e.originalType,l=e.parentName,u=c(e,["components","mdxType","originalType","parentName"]),f=s(n),m=r,d=f["".concat(l,".").concat(m)]||f[m]||p[m]||a;return n?o.createElement(d,i(i({ref:t},u),{},{components:n})):o.createElement(d,i({ref:t},u))}));function m(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var a=n.length,i=new Array(a);i[0]=f;var c={};for(var l in t)hasOwnProperty.call(t,l)&&(c[l]=t[l]);c.originalType=e,c.mdxType="string"==typeof e?e:r,i[1]=c;for(var s=2;s<a;s++)i[s]=n[s];return o.createElement.apply(null,i)}return o.createElement.apply(null,n)}f.displayName="MDXCreateElement"},649:function(e,t,n){n.r(t),n.d(t,{frontMatter:function(){return c},contentTitle:function(){return l},metadata:function(){return s},toc:function(){return u},default:function(){return f}});var o=n(3117),r=n(102),a=(n(7294),n(3905)),i=["components"],c={title:"Hooks with effects"},l=void 0,s={unversionedId:"isolateHook/testing-effects",id:"isolateHook/testing-effects",title:"Hooks with effects",description:"Simulating hook cleanup",source:"@site/docs/isolateHook/02-testing-effects.md",sourceDirName:"isolateHook",slug:"/isolateHook/testing-effects",permalink:"/isolate-react/docs/isolateHook/testing-effects",editUrl:"https://github.com/facebook/docusaurus/edit/main/website/docs/isolateHook/02-testing-effects.md",tags:[],version:"current",sidebarPosition:2,frontMatter:{title:"Hooks with effects"},sidebar:"tutorialSidebar",previous:{title:"Overview",permalink:"/isolate-react/docs/isolateHook/overview"},next:{title:"Testing context",permalink:"/isolate-react/docs/isolateHook/testing-context"}},u=[{value:"Simulating hook cleanup",id:"simulating-hook-cleanup",children:[],level:2}],p={toc:u};function f(e){var t=e.components,n=(0,r.Z)(e,i);return(0,a.kt)("wrapper",(0,o.Z)({},p,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h2",{id:"simulating-hook-cleanup"},"Simulating hook cleanup"),(0,a.kt)("p",null,"You can use the ",(0,a.kt)("inlineCode",{parentName:"p"},"cleanup")," function to simulate the cleanup that happens when a hook is torn down;"),(0,a.kt)("p",null,"Here's a hook that logs when the value of ",(0,a.kt)("inlineCode",{parentName:"p"},"name")," changes:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-javascript"},"  const usePrevious = (name) => {\n    useEffect(() => {\n      console.log(`Hello, ${name}`)\n      return () => {console.log(`Goodbye, ${name}`)}\n    }, [name])\n  }\n")),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-javascript"},"  const testUseHelloGoobye\n")),(0,a.kt)("p",null,"Refer to the ",(0,a.kt)("a",{parentName:"p",href:"/isolate-react/docs/isolateHook/api#cleanup"},"cleanup API docs")," for more information"))}f.isMDXComponent=!0}}]);