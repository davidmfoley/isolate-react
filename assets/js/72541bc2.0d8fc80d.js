"use strict";(self.webpackChunkisolate_components_docs=self.webpackChunkisolate_components_docs||[]).push([[4438],{3905:function(e,n,t){t.d(n,{Zo:function(){return u},kt:function(){return v}});var r=t(7294);function o(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function i(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n&&(r=r.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,r)}return t}function c(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?i(Object(t),!0).forEach((function(n){o(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):i(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function a(e,n){if(null==e)return{};var t,r,o=function(e,n){if(null==e)return{};var t,r,o={},i=Object.keys(e);for(r=0;r<i.length;r++)t=i[r],n.indexOf(t)>=0||(o[t]=e[t]);return o}(e,n);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)t=i[r],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(o[t]=e[t])}return o}var s=r.createContext({}),d=function(e){var n=r.useContext(s),t=n;return e&&(t="function"==typeof e?e(n):c(c({},n),e)),t},u=function(e){var n=d(e.components);return r.createElement(s.Provider,{value:n},e.children)},p={inlineCode:"code",wrapper:function(e){var n=e.children;return r.createElement(r.Fragment,{},n)}},l=r.forwardRef((function(e,n){var t=e.components,o=e.mdxType,i=e.originalType,s=e.parentName,u=a(e,["components","mdxType","originalType","parentName"]),l=d(t),v=o,f=l["".concat(s,".").concat(v)]||l[v]||p[v]||i;return t?r.createElement(f,c(c({ref:n},u),{},{components:t})):r.createElement(f,c({ref:n},u))}));function v(e,n){var t=arguments,o=n&&n.mdxType;if("string"==typeof e||o){var i=t.length,c=new Array(i);c[0]=l;var a={};for(var s in n)hasOwnProperty.call(n,s)&&(a[s]=n[s]);a.originalType=e,a.mdxType="string"==typeof e?e:o,c[1]=a;for(var d=2;d<i;d++)c[d]=t[d];return r.createElement.apply(null,c)}return r.createElement.apply(null,t)}l.displayName="MDXCreateElement"},5045:function(e,n,t){t.r(n),t.d(n,{frontMatter:function(){return a},contentTitle:function(){return s},metadata:function(){return d},toc:function(){return u},default:function(){return l}});var r=t(7462),o=t(3366),i=(t(7294),t(3905)),c=["components"],a={},s=void 0,d={unversionedId:"test-driven-react/dependency-inversion/overview",id:"test-driven-react/dependency-inversion/overview",isDocsHomePage:!1,title:"overview",description:"Dependency Inversion",source:"@site/docs/test-driven-react/dependency-inversion/01-overview.md",sourceDirName:"test-driven-react/dependency-inversion",slug:"/test-driven-react/dependency-inversion/overview",permalink:"/docs/test-driven-react/dependency-inversion/overview",editUrl:"https://github.com/facebook/docusaurus/edit/main/website/docs/test-driven-react/dependency-inversion/01-overview.md",tags:[],version:"current",sidebarPosition:1,frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"not-about-testing-really",permalink:"/docs/test-driven-react/not-about-testing-really"},next:{title:"Closures",permalink:"/docs/test-driven-react/dependency-inversion/closures"}},u=[{value:"Dependency Inversion",id:"dependency-inversion",children:[{value:"What is it?",id:"what-is-it",children:[]},{value:"How does it work?",id:"how-does-it-work",children:[]}]}],p={toc:u};function l(e){var n=e.components,t=(0,o.Z)(e,c);return(0,i.kt)("wrapper",(0,r.Z)({},p,t,{components:n,mdxType:"MDXLayout"}),(0,i.kt)("h2",{id:"dependency-inversion"},"Dependency Inversion"),(0,i.kt)("h3",{id:"what-is-it"},"What is it?"),(0,i.kt)("h3",{id:"how-does-it-work"},"How does it work?"))}l.isMDXComponent=!0}}]);