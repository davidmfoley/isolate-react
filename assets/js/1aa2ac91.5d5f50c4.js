"use strict";(self.webpackChunkisolate_react_docs=self.webpackChunkisolate_react_docs||[]).push([[383],{3905:function(e,t,n){n.d(t,{Zo:function(){return p},kt:function(){return m}});var r=n(7294);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function c(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},i=Object.keys(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var a=r.createContext({}),l=function(e){var t=r.useContext(a),n=t;return e&&(n="function"==typeof e?e(t):c(c({},t),e)),n},p=function(e){var t=l(e.components);return r.createElement(a.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},d=r.forwardRef((function(e,t){var n=e.components,o=e.mdxType,i=e.originalType,a=e.parentName,p=s(e,["components","mdxType","originalType","parentName"]),d=l(n),m=o,f=d["".concat(a,".").concat(m)]||d[m]||u[m]||i;return n?r.createElement(f,c(c({ref:t},p),{},{components:n})):r.createElement(f,c({ref:t},p))}));function m(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var i=n.length,c=new Array(i);c[0]=d;var s={};for(var a in t)hasOwnProperty.call(t,a)&&(s[a]=t[a]);s.originalType=e,s.mdxType="string"==typeof e?e:o,c[1]=s;for(var l=2;l<i;l++)c[l]=n[l];return r.createElement.apply(null,c)}return r.createElement.apply(null,n)}d.displayName="MDXCreateElement"},2268:function(e,t,n){n.r(t),n.d(t,{frontMatter:function(){return s},contentTitle:function(){return a},metadata:function(){return l},toc:function(){return p},default:function(){return d}});var r=n(3117),o=n(102),i=(n(7294),n(3905)),c=["components"],s={title:"Replace existing method (jest.spyOn)",sidebar_label:"Code Smell - Replace existing method (jest.spyOn)"},a=void 0,l={unversionedId:"More/Dependencies/replace-method-on-existing-object",id:"More/Dependencies/replace-method-on-existing-object",title:"Replace existing method (jest.spyOn)",description:"Don't use jest.spyOn",source:"@site/docs/More/Dependencies/10-replace-method-on-existing-object.md",sourceDirName:"More/Dependencies",slug:"/More/Dependencies/replace-method-on-existing-object",permalink:"/isolate-react/More/Dependencies/replace-method-on-existing-object",editUrl:"https://github.com/davidmfoley/isolate-react/docusaurus/docs/More/Dependencies/10-replace-method-on-existing-object.md",tags:[],version:"current",sidebarPosition:10,frontMatter:{title:"Replace existing method (jest.spyOn)",sidebar_label:"Code Smell - Replace existing method (jest.spyOn)"},sidebar:"tutorialSidebar",previous:{title:"Code smell - Mocking imports (jest.mock)",permalink:"/isolate-react/More/Dependencies/file-mocks"},next:{title:"Overview",permalink:"/isolate-react/Testing Components/overview"}},p=[{value:"Don&#39;t use jest.spyOn",id:"dont-use-jestspyon",children:[],level:2}],u={toc:p};function d(e){var t=e.components,n=(0,o.Z)(e,c);return(0,i.kt)("wrapper",(0,r.Z)({},u,n,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("h2",{id:"dont-use-jestspyon"},"Don't use jest.spyOn"))}d.isMDXComponent=!0}}]);