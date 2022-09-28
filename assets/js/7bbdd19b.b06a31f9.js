"use strict";(self.webpackChunkisolate_react_docs=self.webpackChunkisolate_react_docs||[]).push([[681],{3905:function(e,t,n){n.d(t,{Zo:function(){return p},kt:function(){return m}});var r=n(7294);function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function a(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){i(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function c(e,t){if(null==e)return{};var n,r,i=function(e,t){if(null==e)return{};var n,r,i={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(i[n]=e[n]);return i}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}var s=r.createContext({}),l=function(e){var t=r.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):a(a({},t),e)),n},p=function(e){var t=l(e.components);return r.createElement(s.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},d=r.forwardRef((function(e,t){var n=e.components,i=e.mdxType,o=e.originalType,s=e.parentName,p=c(e,["components","mdxType","originalType","parentName"]),d=l(n),m=i,f=d["".concat(s,".").concat(m)]||d[m]||u[m]||o;return n?r.createElement(f,a(a({ref:t},p),{},{components:n})):r.createElement(f,a({ref:t},p))}));function m(e,t){var n=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var o=n.length,a=new Array(o);a[0]=d;var c={};for(var s in t)hasOwnProperty.call(t,s)&&(c[s]=t[s]);c.originalType=e,c.mdxType="string"==typeof e?e:i,a[1]=c;for(var l=2;l<o;l++)a[l]=n[l];return r.createElement.apply(null,a)}return r.createElement.apply(null,n)}d.displayName="MDXCreateElement"},5766:function(e,t,n){n.r(t),n.d(t,{frontMatter:function(){return c},contentTitle:function(){return s},metadata:function(){return l},toc:function(){return p},default:function(){return d}});var r=n(3117),i=n(102),o=(n(7294),n(3905)),a=["components"],c={title:"Service Locator"},s=void 0,l={unversionedId:"More/Dependencies/service-locator",id:"More/Dependencies/service-locator",title:"Service Locator",description:"Description",source:"@site/docs/More/Dependencies/03-service-locator.md",sourceDirName:"More/Dependencies",slug:"/More/Dependencies/service-locator",permalink:"/isolate-react/More/Dependencies/service-locator",editUrl:"https://github.com/davidmfoley/isolate-react/docusaurus/docs/More/Dependencies/03-service-locator.md",tags:[],version:"current",sidebarPosition:3,frontMatter:{title:"Service Locator"},sidebar:"tutorialSidebar",previous:{title:"Closures",permalink:"/isolate-react/More/Dependencies/closures"},next:{title:"Default arguments",permalink:"/isolate-react/More/Dependencies/default-arguments"}},p=[{value:"Description",id:"description",children:[],level:2},{value:"Example",id:"example",children:[],level:2},{value:"Notes",id:"notes",children:[],level:2}],u={toc:p};function d(e){var t=e.components,n=(0,i.Z)(e,a);return(0,o.kt)("wrapper",(0,r.Z)({},u,n,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("h2",{id:"description"},"Description"),(0,o.kt)("p",null,'Rather than importing a module(service) directly in the module that consumes it, "locate it" via a function that returns the implementation.'),(0,o.kt)("p",null,"In production code, configure the locator to return the production implementation. This can be done either by defaulting the locator to the production implementation, or by setting up each service locator when the app starts up."),(0,o.kt)("p",null,"In tests, set up the locator to return a different implementation as needed."),(0,o.kt)("h2",{id:"example"},"Example"),(0,o.kt)("p",null,(0,o.kt)("strong",{parentName:"p"},"api.ts")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-javascript"},'// current instance of the service\nlet _api;\n\n// Set the service\nexport const setApi = (api) => { _api = api };\n\n// This is the "service locator"\nexport const getApi = () => _api;\n')),(0,o.kt)("p",null,(0,o.kt)("strong",{parentName:"p"},"widgets.ts")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-javascript"},"import { getApi } from './api'\n\nexport const widgets = {\n  getWidgetName: async (widgetId) => {\n    const api = getApi();\n    const widget = await api.getWidget(widgetId);\n    if (!widget) return \"Unknown Widget\"\n    return widget.name\n  }\n}\n")),(0,o.kt)("p",null,(0,o.kt)("strong",{parentName:"p"},"widgets.test.ts")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},"import { setApi } from './api'\nimport { widgets } from './widgets'\n\ndescribe(\"getWidgetName\", () => {\n  test(\"unknown widget returns 'Unknown Widget'\", () => {\n    // Test \"api\" that always returns undefined\n    const fakeApi = {\n      getWidget: async () => undefined\n    }\n\n    setApi(fakeApi)\n\n    expect(widgets.getWidgetName(42)).toEqual('Unknown Widget')\n  })\n})\n")),(0,o.kt)("h2",{id:"notes"},"Notes"),(0,o.kt)("p",null,"This is a general technique that can be used anywhere, not only in react."),(0,o.kt)("p",null,'Sometimes many services are grouped together in a single object. This is sometimes called a "Service Registry".'),(0,o.kt)("p",null,"When we use Service Locator, we add an additional dependency on the locator to each place that uses the service. This complicates the code."))}d.isMDXComponent=!0}}]);