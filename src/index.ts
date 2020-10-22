import isolateHooks from 'isolate-hooks'
import { nodeTree, NodeTree } from './nodeTree'
import { Selector } from './types/Selector'
import { ComponentNode } from './types/ComponentNode'
import { IsolatedComponent } from './types/IsolatedComponent'
import { IsolateComponent } from './types/IsolateComponent'
import { isolateComponent } from './isolateComponent'
export { Selector, ComponentNode }
export { IsolatedComponent, IsolateComponent, isolateComponent }

type Contexts = { contextType: React.Context<any>; contextValue: any }[]

