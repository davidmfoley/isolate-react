"use strict";(self.webpackChunkisolate_react_docs=self.webpackChunkisolate_react_docs||[]).push([[34],{3905:function(e,t,n){n.d(t,{Zo:function(){return p},kt:function(){return m}});var o=n(7294);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function r(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,o)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?r(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):r(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,o,a=function(e,t){if(null==e)return{};var n,o,a={},r=Object.keys(e);for(o=0;o<r.length;o++)n=r[o],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(o=0;o<r.length;o++)n=r[o],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var l=o.createContext({}),c=function(e){var t=o.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},p=function(e){var t=c(e.components);return o.createElement(l.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return o.createElement(o.Fragment,{},t)}},d=o.forwardRef((function(e,t){var n=e.components,a=e.mdxType,r=e.originalType,l=e.parentName,p=s(e,["components","mdxType","originalType","parentName"]),d=c(n),m=a,k=d["".concat(l,".").concat(m)]||d[m]||u[m]||r;return n?o.createElement(k,i(i({ref:t},p),{},{components:n})):o.createElement(k,i({ref:t},p))}));function m(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var r=n.length,i=new Array(r);i[0]=d;var s={};for(var l in t)hasOwnProperty.call(t,l)&&(s[l]=t[l]);s.originalType=e,s.mdxType="string"==typeof e?e:a,i[1]=s;for(var c=2;c<r;c++)i[c]=n[c];return o.createElement.apply(null,i)}return o.createElement.apply(null,n)}d.displayName="MDXCreateElement"},5091:function(e,t,n){n.r(t),n.d(t,{frontMatter:function(){return s},contentTitle:function(){return l},metadata:function(){return c},toc:function(){return p},default:function(){return d}});var o=n(3117),a=n(102),r=(n(7294),n(3905)),i=["components"],s={id:"main",title:"Overview"},l=void 0,c={unversionedId:"main",id:"main",title:"Overview",description:"Test-drive react components and hooks",source:"@site/docs/main.md",sourceDirName:".",slug:"/main",permalink:"/isolate-react/docs/main",editUrl:"https://github.com/facebook/docusaurus/edit/main/website/docs/main.md",tags:[],version:"current",frontMatter:{id:"main",title:"Overview"},sidebar:"tutorialSidebar",previous:{title:"Installation",permalink:"/isolate-react/docs/installation"},next:{title:"Why?",permalink:"/isolate-react/docs/why"}},p=[{value:"Test-drive react components and hooks",id:"test-drive-react-components-and-hooks",children:[{value:"Flexible support for whatever level of testing you prefer:",id:"flexible-support-for-whatever-level-of-testing-you-prefer",children:[],level:3},{value:"Low-friction:",id:"low-friction",children:[],level:3},{value:"isolateHook",id:"isolatehook",children:[],level:3},{value:"isolateComponent",id:"isolatecomponent",children:[],level:3}],level:2},{value:"Usage",id:"usage",children:[{value:"Isolated component API",id:"isolated-component-api",children:[],level:3},{value:"Issues &amp; Progress",id:"issues--progress",children:[],level:3}],level:2}],u={toc:p};function d(e){var t=e.components,n=(0,a.Z)(e,i);return(0,r.kt)("wrapper",(0,o.Z)({},u,n,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("h2",{id:"test-drive-react-components-and-hooks"},"Test-drive react components and hooks"),(0,r.kt)("p",null,"isolate-react gives you tools to test-drive your react components that focus on speed and simplicity."),(0,r.kt)("h3",{id:"flexible-support-for-whatever-level-of-testing-you-prefer"},"Flexible support for whatever level of testing you prefer:"),(0,r.kt)("ul",{className:"contains-task-list"},(0,r.kt)("li",{parentName:"ul",className:"task-list-item"},(0,r.kt)("input",{parentName:"li",type:"checkbox",checked:!0,disabled:!0})," ","Test custom hooks"),(0,r.kt)("li",{parentName:"ul",className:"task-list-item"},(0,r.kt)("input",{parentName:"li",type:"checkbox",checked:!0,disabled:!0})," ","Render a single component at a time (isolated/unit testing) "),(0,r.kt)("li",{parentName:"ul",className:"task-list-item"},(0,r.kt)("input",{parentName:"li",type:"checkbox",checked:!0,disabled:!0})," ","Render multiple components toegether (integrated testing)")),(0,r.kt)("h3",{id:"low-friction"},"Low-friction:"),(0,r.kt)("ul",{className:"contains-task-list"},(0,r.kt)("li",{parentName:"ul",className:"task-list-item"},(0,r.kt)("input",{parentName:"li",type:"checkbox",checked:!0,disabled:!0})," ","Works with any test runner that runs in node (jest, mocha, tape, tap, etc.)"),(0,r.kt)("li",{parentName:"ul",className:"task-list-item"},(0,r.kt)("input",{parentName:"li",type:"checkbox",checked:!0,disabled:!0})," ","Full hook support"),(0,r.kt)("li",{parentName:"ul",className:"task-list-item"},(0,r.kt)("input",{parentName:"li",type:"checkbox",checked:!0,disabled:!0})," ","Easy access to set context values needed for testing"),(0,r.kt)("li",{parentName:"ul",className:"task-list-item"},(0,r.kt)("input",{parentName:"li",type:"checkbox",checked:!0,disabled:!0})," ","No virtual DOM or other tools to install"),(0,r.kt)("li",{parentName:"ul",className:"task-list-item"},(0,r.kt)("input",{parentName:"li",type:"checkbox",checked:!0,disabled:!0})," ","Very fast")),(0,r.kt)("p",null,(0,r.kt)("inlineCode",{parentName:"p"},"isolate-react")," exports two main functions:"),(0,r.kt)("h3",{id:"isolatehook"},"isolateHook"),(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"/isolate-react/docs/isolateHook/overview"},"isolateHook")," enables unit-testing hooks."),(0,r.kt)("h3",{id:"isolatecomponent"},"isolateComponent"),(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"/isolate-react/docs/isolateComponent/overview"},"isolateComponent")," enables unit-testing react components."),(0,r.kt)("h2",{id:"usage"},"Usage"),(0,r.kt)("p",null,"See ",(0,r.kt)("a",{parentName:"p",href:"https://davidmfoley.github.io/isolate-react/globals.html#isolatecomponent"},"API documentation"),"."),(0,r.kt)("h3",{id:"isolated-component-api"},"Isolated component API"),(0,r.kt)("p",null,"An isolated component has some methods to help exercise and inspect it."),(0,r.kt)("p",null,"See the ",(0,r.kt)("a",{parentName:"p",href:"https://davidmfoley.github.io/isolate-react/api"},"API docs")),(0,r.kt)("h3",{id:"issues--progress"},"Issues & Progress"),(0,r.kt)("p",null,"See the ",(0,r.kt)("a",{parentName:"p",href:"https://github.com/davidmfoley/isolate-react/projects/1"},"project tracker")," for project progress."),(0,r.kt)("p",null,"File an ",(0,r.kt)("a",{parentName:"p",href:"https://github.com/davidmfoley/isolate-react/issues"},"issue")," if you have a suggestion or request."))}d.isMDXComponent=!0}}]);