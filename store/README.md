# How to use store

```typescript
// file.tsx
import * as React from 'react'
import { Context } from '@/store' // Import Context from store

export default function Home() {
  const { store, dispatch } = React.useContext(Context) // Use Context

  console.log(store.user) // TS will hint you the store object (ex: store.<localModule>)

  dispatch(
    'user/SET_USER'/** TS will hint you all available actions */,
    { name: 'John Doe', age: 30 } // ✅ TS will check if this payload match the action `user/SET_USER`
  )

  dispatch(
    'user/SET_USER',
    { name: 'John Doe', age: '30' } // ❌ `age` should be number but got string
  )

  return <h1>Welcome</h1>
}
```

# How to add new action

That's say we want to add a 'SET_USER' action in 'user' module

1. Add the implementation inside `user.store.ts`

```typescript
// user.store.ts
import type { StateInitializerArg, Reducer } from './_types'

export class UserState {
  name: string = ''
  age: number | null = null

  constructor(_args: StateInitializerArg) {
    this.name = 'John'
  }
}

export type UserActionType = 'CLEAR_USER' | 'SET_USER' // Add the action enum. Note the naming should be uppercase `{ACTION_NAME}` without local module name as prefix.

// Define the args that should pass to `SET_USER` as payload, and make sure you export it
export interface SetUserArgs {
  name: string
  age: number
}

export const userReducer: Reducer<UserAction, UserState> = {
  ['SET_USER']({ state }, payload: SetUserArgs) {
    return { ...state, ...payload }
  },
  // Implement the code. TS will hint you that you should implement the 'CLEAR_USER' reducer
  async ['CLEAR_USER']() {
    await new Promise((resolve) => setTimeout(resolve, 2000))

    return {
      name: '',
      age: null,
    }
  },
}
```

2. Add the type definition inside `_types.ts`

```typescript
import { UserState, UserAction, SetUserArgs } from './user.store'

export type StoreModuleKeys = 'user' | 'other'
export type State = UserState | OtherState

export interface Store {
  user: UserState
  other: OtherState
  [key: string]: any
}

export type DispatchAction = `user/${UserAction}` | `other/${OtherAction}`
export interface Dispatch<
  T = {
    store: Store
    storeRef: React.MutableRefObject<Store>
  },
> {
  (actionType: 'user/SET_USER', payload: SetUserArgs): Promise<T>
  (actionType: 'user/CLEAR_USER'): Promise<T>
  (actionType: 'other/ACTION_NAME'): Promise<T>
}

export type ReducerAction = UserAction | OtherAction

// If you need args to initialize local module, implement the code below.
// TS will hint args.user in constructor.
export interface StoreInitializerArg {
  user?: Partial<UserState>
  [key: string]: any
}
```

# How to add initializer and local module to store

Import local module state, then add it into store.

```typescript
// store.index.tsx
import { UserState } from './user.store'

const storeInitializer: StoreInitializer = (args) => ({
  user: new UserState(args),
  other: new otherState(),
})
```
