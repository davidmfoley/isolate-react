"use strict";(self.webpackChunkisolate_react_docs=self.webpackChunkisolate_react_docs||[]).push([[694],{3905:function(e,n,t){t.d(n,{Zo:function(){return d},kt:function(){return u}});var o=t(7294);function l(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function r(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);n&&(o=o.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,o)}return t}function a(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?r(Object(t),!0).forEach((function(n){l(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):r(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function i(e,n){if(null==e)return{};var t,o,l=function(e,n){if(null==e)return{};var t,o,l={},r=Object.keys(e);for(o=0;o<r.length;o++)t=r[o],n.indexOf(t)>=0||(l[t]=e[t]);return l}(e,n);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(o=0;o<r.length;o++)t=r[o],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(l[t]=e[t])}return l}var s=o.createContext({}),p=function(e){var n=o.useContext(s),t=n;return e&&(t="function"==typeof e?e(n):a(a({},n),e)),t},d=function(e){var n=p(e.components);return o.createElement(s.Provider,{value:n},e.children)},c={inlineCode:"code",wrapper:function(e){var n=e.children;return o.createElement(o.Fragment,{},n)}},m=o.forwardRef((function(e,n){var t=e.components,l=e.mdxType,r=e.originalType,s=e.parentName,d=i(e,["components","mdxType","originalType","parentName"]),m=p(t),u=l,h=m["".concat(s,".").concat(u)]||m[u]||c[u]||r;return t?o.createElement(h,a(a({ref:n},d),{},{components:t})):o.createElement(h,a({ref:n},d))}));function u(e,n){var t=arguments,l=n&&n.mdxType;if("string"==typeof e||l){var r=t.length,a=new Array(r);a[0]=m;var i={};for(var s in n)hasOwnProperty.call(n,s)&&(i[s]=n[s]);i.originalType=e,i.mdxType="string"==typeof e?e:l,a[1]=i;for(var p=2;p<r;p++)a[p]=t[p];return o.createElement.apply(null,a)}return o.createElement.apply(null,t)}m.displayName="MDXCreateElement"},9639:function(e,n,t){t.r(n),t.d(n,{frontMatter:function(){return i},contentTitle:function(){return s},metadata:function(){return p},toc:function(){return d},default:function(){return m}});var o=t(3117),l=t(102),r=(t(7294),t(3905)),a=["components"],i={title:"API"},s="isolateComponent API",p={unversionedId:"Testing Components/api",id:"Testing Components/api",title:"API",description:"isolateComponent() and isolateComponentTree()",source:"@site/docs/Testing Components/api.md",sourceDirName:"Testing Components",slug:"/Testing Components/api",permalink:"/isolate-react/Testing Components/api",editUrl:"https://github.com/davidmfoley/isolate-react/docusaurus/docs/Testing Components/api.md",tags:[],version:"current",frontMatter:{title:"API"},sidebar:"tutorialSidebar",previous:{title:"portals",permalink:"/isolate-react/Testing Components/portals"},next:{title:"Overview",permalink:"/isolate-react/Testing Hooks/overview"}},d=[{value:"isolateComponent() and isolateComponentTree()",id:"isolatecomponent-and-isolatecomponenttree",children:[],level:2},{value:"IsolatedComponent: inspect content",id:"isolatedcomponent-inspect-content",children:[{value:"content()",id:"content",children:[],level:3},{value:"toString()",id:"tostring",children:[],level:3}],level:2},{value:"IsolatedComponent: wait for next render",id:"isolatedcomponent-wait-for-next-render",children:[{value:"waitForRender()",id:"waitforrender",children:[],level:3}],level:2},{value:"IsolatedComponent: find child nodes",id:"isolatedcomponent-find-child-nodes",children:[{value:"findAll(selector)",id:"findallselector",children:[],level:3},{value:"findOne(selector)",id:"findoneselector",children:[],level:3},{value:"exists(selector)",id:"existsselector",children:[],level:3}],level:2},{value:"IsolatedComponent: inline child components",id:"isolatedcomponent-inline-child-components",children:[{value:"inline(selector)",id:"inlineselector",children:[],level:3}],level:2},{value:"IsolatedComponent: Update props",id:"isolatedcomponent-update-props",children:[{value:"mergeProps(newProps)",id:"mergepropsnewprops",children:[],level:3},{value:"setProps(newProps)",id:"setpropsnewprops",children:[],level:3},{value:"cleanup()",id:"cleanup",children:[],level:3},{value:"setContext",id:"setcontext",children:[],level:3}],level:2},{value:"Selector",id:"selector",children:[{value:"Selector strings",id:"selector-strings",children:[],level:3},{value:"React component as selector",id:"react-component-as-selector",children:[],level:3}],level:2},{value:"ComponentNode",id:"componentnode",children:[{value:"content()",id:"content-1",children:[],level:3},{value:"toString()",id:"tostring-1",children:[],level:3},{value:"props",id:"props",children:[],level:3},{value:"findAll, findOne, exists",id:"findall-findone-exists",children:[{value:"Typescript note",id:"typescript-note",children:[],level:5}],level:3}],level:2}],c={toc:d};function m(e){var n=e.components,t=(0,l.Z)(e,a);return(0,r.kt)("wrapper",(0,o.Z)({},c,t,{components:n,mdxType:"MDXLayout"}),(0,r.kt)("h1",{id:"isolatecomponent-api"},"isolateComponent API"),(0,r.kt)("h2",{id:"isolatecomponent-and-isolatecomponenttree"},"isolateComponent() and isolateComponentTree()"),(0,r.kt)("p",null,(0,r.kt)("inlineCode",{parentName:"p"},"isolateComponent")," and ",(0,r.kt)("inlineCode",{parentName:"p"},"isolateComponentTree")," each accept React elements, usually rendered with JSX, and return an ",(0,r.kt)("a",{parentName:"p",href:"#isolatedcomponent"},"IsolatedComponent")),(0,r.kt)("p",null,"Import isolateComponent:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-javascript"},"import { isolateComponent } from 'isolate-react'\n")),(0,r.kt)("p",null,"Isolate a component:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-javascript"},'const Hello = (props) => <div>Hello {props.name}</div>\n\nconst isolated = isolateComponent(<Hello name="Arthur" />)\n')),(0,r.kt)("h1",{id:"isolatedcomponent"},"IsolatedComponent"),(0,r.kt)("p",null,(0,r.kt)("inlineCode",{parentName:"p"},"IsolatedComponent")," is the return type of ",(0,r.kt)("a",{parentName:"p",href:"#isolatecomponent"},"isolateComponent"),". It provides methods for exploring and manipulating the isolated component."),(0,r.kt)("h2",{id:"isolatedcomponent-inspect-content"},"IsolatedComponent: inspect content"),(0,r.kt)("h3",{id:"content"},"content()"),(0,r.kt)("p",null,"returns the component's ",(0,r.kt)("em",{parentName:"p"},"inner")," content."),(0,r.kt)("h3",{id:"tostring"},"toString()"),(0,r.kt)("p",null,"returns the component's ",(0,r.kt)("em",{parentName:"p"},"outer")," content."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-javascript"},"const Answer = ({ answer }: { answer: number }) => (\n  <span>The answer is {answer}</span>\n)\n\nconst answer = isolateComponent(<Answer answer={42} />)\nconsole.log(answer.content()) // => 'The answer is 42'\nconsole.log(answer.toString()) // => '<span>The answer is 42</span>'\n")),(0,r.kt)("h2",{id:"isolatedcomponent-wait-for-next-render"},"IsolatedComponent: wait for next render"),(0,r.kt)("h3",{id:"waitforrender"},"waitForRender()"),(0,r.kt)("p",null,"Returns a promise that resolves after the next render."),(0,r.kt)("p",null,"Useful for testing components with asynchronous behavior."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-javascript"},"const DelayedAnswer = () => {\n  // initial value\n  const [answer, setAnswer] = useState(\"unknown\")\n\n  // update the value 100 milliseconds later\n  useEffect(() => {\n    setTimeout(() => { setAnswer(\"forty-two\") }, 100)\n  }, [])\n\n  return (\n    <span>The answer is {answer}</span>\n  )\n}\n\nconst answer = isolateComponent(<DelayedAnswer />)\nconsole.log(answer.content()) // => 'The answer is unknown'\n\n// wait for the next render\nawait answer.waitForRender()\n\nconsole.log(answer.content()) // => 'The answer is forty-two'\n")),(0,r.kt)("h2",{id:"isolatedcomponent-find-child-nodes"},"IsolatedComponent: find child nodes"),(0,r.kt)("h3",{id:"findallselector"},"findAll(selector)"),(0,r.kt)("p",null,"Find all nodes that match the given ",(0,r.kt)("a",{parentName:"p",href:"#selector"},"Selector"),"."),(0,r.kt)("p",null,"Returns an array of ",(0,r.kt)("a",{parentName:"p",href:"#componentnode"},"ComponentNodes"),"."),(0,r.kt)("h3",{id:"findoneselector"},"findOne(selector)"),(0,r.kt)("p",null,"Find a single child node that matches the given ",(0,r.kt)("a",{parentName:"p",href:"#selector"},"Selector"),"."),(0,r.kt)("p",null,"Returns a ",(0,r.kt)("a",{parentName:"p",href:"#componentnode"},"ComponentNode")," if and only if there is a single matching node."),(0,r.kt)("p",null,"Throws an Error if there are zero or multiple matching nodes."),(0,r.kt)("h3",{id:"existsselector"},"exists(selector)"),(0,r.kt)("p",null,"Check for the existence of any html elements or react components matching the selector.\nReturns true if any found, false if none found."),(0,r.kt)("h2",{id:"isolatedcomponent-inline-child-components"},"IsolatedComponent: inline child components"),(0,r.kt)("h3",{id:"inlineselector"},"inline(selector)"),(0,r.kt)("p",null,"Finds all elements rendered by the isolated component that match the given ",(0,r.kt)("a",{parentName:"p",href:"#selector"},"Selector")," and inlines them, incorporating them into the rendered output.\nAllows for testing some or all of the child components rendered by the isolated component together."),(0,r.kt)("p",null,"Use the '",(0,r.kt)("em",{parentName:"p"},"' wildcard to inline "),"all",(0,r.kt)("em",{parentName:"p"}," child elements `inline('"),"')`."),(0,r.kt)("p",null,"Important things to know:"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"Inlining is recursive. The same inlining rules are "),(0,r.kt)("li",{parentName:"ul"},"An isolated component remembers all inlined selectors for the duration of its existence. If a new element is created that matches any inlined selector, it will also be inlined.")),(0,r.kt)("h2",{id:"isolatedcomponent-update-props"},"IsolatedComponent: Update props"),(0,r.kt)("p",null,"These methods both update the props of the component under test. The difference is that mergeProps preserves the props that are not set, while setProps replaces all of the props."),(0,r.kt)("h3",{id:"mergepropsnewprops"},"mergeProps(newProps)"),(0,r.kt)("p",null,"Set a subset of props, and re-render the component under test."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-javascript"},'const FirstLast = (props) => <div>{props.first} {props.last}</div>\n\nconst isolated = isolateComponent(<FirstLast first="Ford" last="Prefect" />)\nconsole.log(isolated.toString())    // => <div>Ford Prefect</div>\nisolated.mergeProps({last: Focus})\nconsole.log(isolated.toString())    // => <div>Ford Focus</div>\n')),(0,r.kt)("h3",{id:"setpropsnewprops"},"setProps(newProps)"),(0,r.kt)("p",null,"Replace all props, and re-render the component under test"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-javascript"},"const FirstLast = (props) => <div>{props.first} {props.last}</div>\n\nconst isolated = isolateComponent(<FirstLast first=\"Ford\" last=\"Prefect\" />)\nconsole.log(isolated.toString()())    // => <div>Ford Prefect</div>\nisolated.setProps({first: 'Arthur', last: 'Dent'})\nconsole.log(isolated.toString()())    // => <div>Arthur Dent</div>\n")),(0,r.kt)("h3",{id:"cleanup"},"cleanup()"),(0,r.kt)("p",null,"Cleans up the component and runs all effect cleanups (functions returned by useEffect or useLayoutEffect handlers)."),(0,r.kt)("p",null,"This is equivalent to unmounting a component/removing it from the tree."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-javascript"},"\n// component that logs 'Goodbye' on unmount:\nconst Goodbye = () => {\n  useEffect(() => {\n    return () => { console.log('Goodbye') }\n  }, [])\n\n  return <div />\n}\n\nconst isolated = isolateComponent(<Goodbye />)\nisolated.cleanup() // Logs 'Goodbye'\n")),(0,r.kt)("h3",{id:"setcontext"},"setContext"),(0,r.kt)("p",null,"Set a context value."),(0,r.kt)("p",null,"Useful when testing a component that uses values from ",(0,r.kt)("inlineCode",{parentName:"p"},"useContext:")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-javascript"},"const NameContext = createContext('Zaphod')\n\nconst HelloFromContext = () => {\n  const name = useContext(NameContext)\n  return <div>Hello ${name}</div>\n}\n\nconst isolated = isolateComponent(<Hello />)\nconsole.log(isolated.toString()())    // => <div>Zaphod</div>\n\nisolated.setContext(NameContext, 'Trillian')\nconsole.log(isolated.toString()())    // => <div>Trillian</div>\n")),(0,r.kt)("h2",{id:"selector"},"Selector"),(0,r.kt)("p",null,(0,r.kt)("inlineCode",{parentName:"p"},"Selectors")," are used with the methods ",(0,r.kt)("inlineCode",{parentName:"p"},"findOne"),", ",(0,r.kt)("inlineCode",{parentName:"p"},"findAll"),", ",(0,r.kt)("inlineCode",{parentName:"p"},"exists"),", and ",(0,r.kt)("inlineCode",{parentName:"p"},"inline")," to match child nodes."),(0,r.kt)("p",null,(0,r.kt)("inlineCode",{parentName:"p"},"Selector")," can be either a string or a component function."),(0,r.kt)("h3",{id:"selector-strings"},"Selector strings"),(0,r.kt)("p",null,"Selector strings support a subset of css-like matching, including matching id or class names and some matching of arbitrary properties."),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"Find by tag:")),(0,r.kt)("p",null,(0,r.kt)("inlineCode",{parentName:"p"},"button")," will match any ",(0,r.kt)("inlineCode",{parentName:"p"},"<button>")," tags"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"Find by id:")),(0,r.kt)("p",null,(0,r.kt)("inlineCode",{parentName:"p"},"div#awesome-id")," and ",(0,r.kt)("inlineCode",{parentName:"p"},"#awesome-id")," will find ",(0,r.kt)("inlineCode",{parentName:"p"},"<div id='awesome' />")),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"Find by className:")),(0,r.kt)("p",null,(0,r.kt)("inlineCode",{parentName:"p"},"span.cool")," and ",(0,r.kt)("inlineCode",{parentName:"p"},".cool")," will each find ",(0,r.kt)("inlineCode",{parentName:"p"},"<span className='cool' />"),"m"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"Find by a matching prop:")),(0,r.kt)("p",null,(0,r.kt)("inlineCode",{parentName:"p"},"[data-test-id=foobar]")," will find the react element or html element with a ",(0,r.kt)("inlineCode",{parentName:"p"},"data-test-id")," prop with the value ",(0,r.kt)("inlineCode",{parentName:"p"},"foobar")),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"Find a react component by name:")),(0,r.kt)("p",null,(0,r.kt)("inlineCode",{parentName:"p"},"MyComponent")," will match a react component with a ",(0,r.kt)("a",{parentName:"p",href:"https://reactjs.org/docs/react-component.html#displayname"},"displayName"),' of "MyComponent"'),(0,r.kt)("h3",{id:"react-component-as-selector"},"React component as selector"),(0,r.kt)("p",null,"You can use a react component function as a selector"),(0,r.kt)("h2",{id:"componentnode"},"ComponentNode"),(0,r.kt)("p",null,"The methods ",(0,r.kt)("inlineCode",{parentName:"p"},"findOne")," and ",(0,r.kt)("inlineCode",{parentName:"p"},"findAll")," on an isolated component return ",(0,r.kt)("inlineCode",{parentName:"p"},"ComponentNodes"),". "),(0,r.kt)("p",null,"A ",(0,r.kt)("inlineCode",{parentName:"p"},"ComponentNode")," is a single node that was found within the rendered elements of an isolated component. It offers methods for inspecting its content and props."),(0,r.kt)("h3",{id:"content-1"},"content()"),(0,r.kt)("p",null,"Returns the inner content of the node."),(0,r.kt)("h3",{id:"tostring-1"},"toString()"),(0,r.kt)("p",null,"Returns the outer content of the node."),(0,r.kt)("h3",{id:"props"},"props"),(0,r.kt)("p",null,"Provides access to the props that were used on the latest render. "),(0,r.kt)("h3",{id:"findall-findone-exists"},"findAll, findOne, exists"),(0,r.kt)("p",null,"These methods work the same as the equivalent methods on ",(0,r.kt)("a",{parentName:"p",href:"#isolatedcomponent"},"IsolatedComponent"),", scoped to the children of the ComponentNode."),(0,r.kt)("h5",{id:"typescript-note"},"Typescript note"),(0,r.kt)("p",null,"Depending on the Selector that was used, access to ",(0,r.kt)("inlineCode",{parentName:"p"},"props")," may be typesafe."),(0,r.kt)("p",null,"If a component function was used as a selector, the type of ",(0,r.kt)("inlineCode",{parentName:"p"},"props")," will match the props of that component. If a string selector was used, the props willl be untyped (any)."))}m.isMDXComponent=!0}}]);