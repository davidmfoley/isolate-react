"use strict";(self.webpackChunkisolate_react_docs=self.webpackChunkisolate_react_docs||[]).push([[475],{3905:function(e,t,n){n.d(t,{Zo:function(){return l},kt:function(){return d}});var r=n(7294);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function a(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function c(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},i=Object.keys(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var p=r.createContext({}),s=function(e){var t=r.useContext(p),n=t;return e&&(n="function"==typeof e?e(t):a(a({},t),e)),n},l=function(e){var t=s(e.components);return r.createElement(p.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},m=r.forwardRef((function(e,t){var n=e.components,o=e.mdxType,i=e.originalType,p=e.parentName,l=c(e,["components","mdxType","originalType","parentName"]),m=s(n),d=o,f=m["".concat(p,".").concat(d)]||m[d]||u[d]||i;return n?r.createElement(f,a(a({ref:t},l),{},{components:n})):r.createElement(f,a({ref:t},l))}));function d(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var i=n.length,a=new Array(i);a[0]=m;var c={};for(var p in t)hasOwnProperty.call(t,p)&&(c[p]=t[p]);c.originalType=e,c.mdxType="string"==typeof e?e:o,a[1]=c;for(var s=2;s<i;s++)a[s]=n[s];return r.createElement.apply(null,a)}return r.createElement.apply(null,n)}m.displayName="MDXCreateElement"},8363:function(e,t,n){n.r(t),n.d(t,{frontMatter:function(){return c},contentTitle:function(){return p},metadata:function(){return s},toc:function(){return l},default:function(){return m}});var r=n(3117),o=n(102),i=(n(7294),n(3905)),a=["components"],c={title:"Overview"},p=void 0,s={unversionedId:"Testing Components/overview",id:"Testing Components/overview",title:"Overview",description:"isolate-react provides two functions for testing react components:",source:"@site/docs/Testing Components/00-overview.md",sourceDirName:"Testing Components",slug:"/Testing Components/overview",permalink:"/isolate-react/Testing Components/overview",editUrl:"https://github.com/davidmfoley/isolate-react/docusaurus/docs/Testing Components/00-overview.md",tags:[],version:"current",sidebarPosition:0,frontMatter:{title:"Overview"},sidebar:"tutorialSidebar",previous:{title:"Code Smell - Replace existing method (jest.spyOn)",permalink:"/isolate-react/More/Dependencies/replace-method-on-existing-object"},next:{title:"Anatomy of a component test",permalink:"/isolate-react/Testing Components/anatomy-of-a-test"}},l=[{value:"API Documentation",id:"api-documentation",children:[],level:3}],u={toc:l};function m(e){var t=e.components,n=(0,o.Z)(e,a);return(0,i.kt)("wrapper",(0,r.Z)({},u,n,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"isolate-react")," provides two functions for testing react components:"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"isolateComponent")," renders a react component ",(0,i.kt)("em",{parentName:"li"},"but does not render its children"),"."),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"isolateComponentTree")," renders a react component ",(0,i.kt)("em",{parentName:"li"},"and also renders any child components"),".")),(0,i.kt)("p",null,"Both ",(0,i.kt)("inlineCode",{parentName:"p"},"isolateComponent")," and ",(0,i.kt)("inlineCode",{parentName:"p"},"isolateComponentTree")," return the same thing: an ",(0,i.kt)("a",{parentName:"p",href:"./api#IsolatedComponent"},"IsolatedComponent")," that provides methods for inspecting and interacting with the elements rendered by the component."),(0,i.kt)("p",null,"The next couple of pages show examples of each."),(0,i.kt)("h3",{id:"api-documentation"},(0,i.kt)("a",{parentName:"h3",href:"/isolate-react/Testing%20Components/api"},"API Documentation")))}m.isMDXComponent=!0}}]);