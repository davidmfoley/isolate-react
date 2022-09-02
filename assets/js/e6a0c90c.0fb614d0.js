"use strict";(self.webpackChunkisolate_react_docs=self.webpackChunkisolate_react_docs||[]).push([[907],{3905:function(e,t,n){n.d(t,{Zo:function(){return c},kt:function(){return u}});var o=n(7294);function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function r(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,o)}return n}function s(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?r(Object(n),!0).forEach((function(t){i(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):r(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function a(e,t){if(null==e)return{};var n,o,i=function(e,t){if(null==e)return{};var n,o,i={},r=Object.keys(e);for(o=0;o<r.length;o++)n=r[o],t.indexOf(n)>=0||(i[n]=e[n]);return i}(e,t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(o=0;o<r.length;o++)n=r[o],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}var p=o.createContext({}),l=function(e){var t=o.useContext(p),n=t;return e&&(n="function"==typeof e?e(t):s(s({},t),e)),n},c=function(e){var t=l(e.components);return o.createElement(p.Provider,{value:t},e.children)},m={inlineCode:"code",wrapper:function(e){var t=e.children;return o.createElement(o.Fragment,{},t)}},d=o.forwardRef((function(e,t){var n=e.components,i=e.mdxType,r=e.originalType,p=e.parentName,c=a(e,["components","mdxType","originalType","parentName"]),d=l(n),u=i,f=d["".concat(p,".").concat(u)]||d[u]||m[u]||r;return n?o.createElement(f,s(s({ref:t},c),{},{components:n})):o.createElement(f,s({ref:t},c))}));function u(e,t){var n=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var r=n.length,s=new Array(r);s[0]=d;var a={};for(var p in t)hasOwnProperty.call(t,p)&&(a[p]=t[p]);a.originalType=e,a.mdxType="string"==typeof e?e:i,s[1]=a;for(var l=2;l<r;l++)s[l]=n[l];return o.createElement.apply(null,s)}return o.createElement.apply(null,n)}d.displayName="MDXCreateElement"},6554:function(e,t,n){n.r(t),n.d(t,{frontMatter:function(){return a},contentTitle:function(){return p},metadata:function(){return l},toc:function(){return c},default:function(){return d}});var o=n(3117),i=n(102),r=(n(7294),n(3905)),s=["components"],a={title:"isolateComponentTree",sidebar_label:"isolateComponentTree - Test multiple components"},p=void 0,l={unversionedId:"Testing Components/isolateComponentTree",id:"Testing Components/isolateComponentTree",title:"isolateComponentTree",description:"Test a component with all of its children",source:"@site/docs/Testing Components/03-isolateComponentTree.md",sourceDirName:"Testing Components",slug:"/Testing Components/isolateComponentTree",permalink:"/isolate-react/Testing Components/isolateComponentTree",editUrl:"https://github.com/davidmfoley/isolate-react/docusaurus/docs/Testing Components/03-isolateComponentTree.md",tags:[],version:"current",sidebarPosition:3,frontMatter:{title:"isolateComponentTree",sidebar_label:"isolateComponentTree - Test multiple components"},sidebar:"tutorialSidebar",previous:{title:"isolateComponent - Test a single component",permalink:"/isolate-react/Testing Components/isolateComponent"},next:{title:"Testing useContext",permalink:"/isolate-react/Testing Components/testing-with-react-context"}},c=[{value:"Test a component with all of its children",id:"test-a-component-with-all-of-its-children",children:[],level:2}],m={toc:c};function d(e){var t=e.components,n=(0,i.Z)(e,s);return(0,r.kt)("wrapper",(0,o.Z)({},m,n,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("h2",{id:"test-a-component-with-all-of-its-children"},"Test a component with all of its children"),(0,r.kt)("p",null,"Sometimes we want to test a component by rendering its entire component tree. You may be familiar with this technique from using enzyme's ",(0,r.kt)("inlineCode",{parentName:"p"},"mount")," functionality or ",(0,r.kt)("inlineCode",{parentName:"p"},"react-testing-library"),"."),(0,r.kt)("p",null,"We can use ",(0,r.kt)("inlineCode",{parentName:"p"},"isolateComponentTree")," for this."),(0,r.kt)("p",null,"Let's take an example of a shopping list component that allows adding and removing items from a list:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-typescript"},'export const ShoppingList = () => {\n  // items in the shopping list\n  const [items, setItems] = useState<Item[]>([])\n\n  // the id of the next item, used when adding an item to the list\n  const [nextId, setNextId] = useState(1)\n\n  // Render a <ShoppingListItem /> for each item in the list,\n  // And <AddItem /> at the end to allow adding an item\n  return (\n    <ul>\n      {items.map((item) => (\n        <ShoppingListItem\n          item={item}\n          key={item.id}\n          onDeleteItem={() => {\n            setItems(items.filter((i) => i.id !== item.id))\n          }}\n        />\n      ))}\n      <AddItem\n        onAddItem={(description) => {\n          const id = nextId\n          setNextId((nextId) => nextId + 1)\n          setItems([...items, { description, id }])\n        }}\n      />\n    </ul>\n  )\n}\n\nexport const ShoppingListItem = (props: {\n  item: Item\n  onDeleteItem: () => void\n}) => (\n  <li>\n    <span className="item-description">{props.item.description}</span>\n    <button className="delete-item" type="button" onClick={props.onDeleteItem}>\n      Delete\n    </button>\n  </li>\n)\n\nexport const AddItem = (props: {\n  onAddItem: (description: string) => void\n}) => {\n  const [description, setDescription] = useState(\'\')\n  return (\n    <li>\n      <label>\n        Description\n        <input\n          type="text"\n          value={description}\n          name="description"\n          onChange={(e) => setDescription(e.target.value)}\n        />\n      </label>\n      <button\n        type="button"\n        className="add-item"\n        onClick={() => {\n          props.onAddItem(description)\n          setDescription(\'\')\n        }}\n      >\n        Add Item\n      </button>\n    </li>\n  )\n}\n')),(0,r.kt)("p",null,"We can use ",(0,r.kt)("inlineCode",{parentName:"p"},"isolateComponentTree")," to test all of these components together:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-javascript"},"  test('add a shopping list item', () => {\n    const isolated = isolateComponentTree(<ShoppingList />)\n\n    isolated\n      // find the input element by name\n      .findOne('input[name=description]')\n      // simulate a change event\n      .props.onChange({ target: { value: 'Avocado' } })\n\n    // find the Add button by class name\n    isolated.findOne('button.add-item').props.onClick()\n\n    // We should have two lis: shopping list item and \"add item\"\n    expect(isolated.findAll('li').length).toEqual(2)\n\n    // assert that the description matches the input\n    expect(isolated.findOne('span.item-description').content()).toEqual(\n      'Avocado'\n    )\n  })\n")),(0,r.kt)("p",null,"The choice between testing components individually or together has different tradeoffs depending on the components being tested. "),(0,r.kt)("p",null,"In general, testing components together gives confidence in the way the components integrate with each other, at the cost of increased ",(0,r.kt)("a",{parentName:"p",href:"https://en.wikipedia.org/wiki/Coupling_(computer_programming)"},"coupling")," between tests and implementations."))}d.isMDXComponent=!0}}]);