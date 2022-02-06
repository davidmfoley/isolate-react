"use strict";(self.webpackChunkisolate_components_docs=self.webpackChunkisolate_components_docs||[]).push([[825],{3905:function(t,e,n){n.d(e,{Zo:function(){return l},kt:function(){return f}});var o=n(7294);function r(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function i(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(t);e&&(o=o.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,o)}return n}function a(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?i(Object(n),!0).forEach((function(e){r(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}function s(t,e){if(null==t)return{};var n,o,r=function(t,e){if(null==t)return{};var n,o,r={},i=Object.keys(t);for(o=0;o<i.length;o++)n=i[o],e.indexOf(n)>=0||(r[n]=t[n]);return r}(t,e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(t);for(o=0;o<i.length;o++)n=i[o],e.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(t,n)&&(r[n]=t[n])}return r}var c=o.createContext({}),u=function(t){var e=o.useContext(c),n=e;return t&&(n="function"==typeof t?t(e):a(a({},e),t)),n},l=function(t){var e=u(t.components);return o.createElement(c.Provider,{value:e},t.children)},p={inlineCode:"code",wrapper:function(t){var e=t.children;return o.createElement(o.Fragment,{},e)}},d=o.forwardRef((function(t,e){var n=t.components,r=t.mdxType,i=t.originalType,c=t.parentName,l=s(t,["components","mdxType","originalType","parentName"]),d=u(n),f=r,x=d["".concat(c,".").concat(f)]||d[f]||p[f]||i;return n?o.createElement(x,a(a({ref:e},l),{},{components:n})):o.createElement(x,a({ref:e},l))}));function f(t,e){var n=arguments,r=e&&e.mdxType;if("string"==typeof t||r){var i=n.length,a=new Array(i);a[0]=d;var s={};for(var c in e)hasOwnProperty.call(e,c)&&(s[c]=e[c]);s.originalType=t,s.mdxType="string"==typeof t?t:r,a[1]=s;for(var u=2;u<i;u++)a[u]=n[u];return o.createElement.apply(null,a)}return o.createElement.apply(null,n)}d.displayName="MDXCreateElement"},5960:function(t,e,n){n.r(e),n.d(e,{frontMatter:function(){return s},contentTitle:function(){return c},metadata:function(){return u},toc:function(){return l},default:function(){return d}});var o=n(7462),r=n(3366),i=(n(7294),n(3905)),a=["components"],s={id:"context",title:"Context"},c="Usage with useContext",u={unversionedId:"context",id:"context",isDocsHomePage:!1,title:"Context",description:"withContext()",source:"@site/docs/context.md",sourceDirName:".",slug:"/context",permalink:"/isolate-react/docs/context",editUrl:"https://github.com/facebook/docusaurus/edit/main/website/docs/context.md",tags:[],version:"current",frontMatter:{id:"context",title:"Context"},sidebar:"tutorialSidebar",previous:{title:"Comparison to other tools",permalink:"/isolate-react/docs/compare"},next:{title:"effects",permalink:"/isolate-react/docs/effects"}},l=[{value:"withContext()",id:"withcontext",children:[]},{value:"setContext()",id:"setcontext",children:[]}],p={toc:l};function d(t){var e=t.components,n=(0,r.Z)(t,a);return(0,i.kt)("wrapper",(0,o.Z)({},p,n,{components:e,mdxType:"MDXLayout"}),(0,i.kt)("h1",{id:"usage-with-usecontext"},"Usage with useContext"),(0,i.kt)("h2",{id:"withcontext"},"withContext()"),(0,i.kt)("p",null,"The ",(0,i.kt)("inlineCode",{parentName:"p"},"withContext")," method supports setting context values before render for testing components that use ",(0,i.kt)("inlineCode",{parentName:"p"},"useContext"),"."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-js"},"const QuestionContext = React.createContext('')\nconst AnswerContext = React.createContext(0)\n\nconst DisplayQuestionAndAnswer = () => (\n  <div>\n    {React.useContext(QuestionContext)} {React.useContext(AnswerContext)}\n  </div>\n)\n\nconst isolated = isolateComponent\n  .withContext(QuestionContext, 'what is the answer?')\n  .withContext(\n    AnswerContext,\n    42\n  )(<DisplayQuestionAndAnswer />)\n\nconsole.log(isolated.toString()) // => <div>what is the answer? 42</div>\n")),(0,i.kt)("h2",{id:"setcontext"},"setContext()"),(0,i.kt)("p",null,"You can update context values of an isolated component with ",(0,i.kt)("inlineCode",{parentName:"p"},".setContext()"),":"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-js"},"const QuestionContext = React.createContext('')\nconst AnswerContext = React.createContext(0)\n\nconst DisplayQuestionAndAnswer = () => (\n  <div>\n    {React.useContext(QuestionContext)} {React.useContext(AnswerContext)}\n  </div>\n)\n\nconst isolated = isolateComponent(<DisplayQuestionAndAnswer />)\n\nisolated.setContext(QuestionContext, 'what is the answer?')\nisolated.setContext(AnswerContext, 42)\n\nconsole.log(isolated.toString()) // => <div>what is the answer? 42</div>\n")))}d.isMDXComponent=!0}}]);