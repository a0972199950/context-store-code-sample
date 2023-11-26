/*
 * Copyright (c) 2023 LY Corporation. All rights reserved.
 * LY Corporation PROPRIETARY/CONFIDENTIAL. Use is subject to license terms.
 */
import { UserState, UserAction, SetUserArgs } from './user.store'
import { AuthState, AuthAction } from './auth.store'

export type StoreModuleKeys = 'user' | 'auth'
export type State = UserState | AuthState

export interface Store {
  user: UserState
  auth: AuthState
  [key: string]: any
}

export type DispatchAction = `user/${UserAction}` | `auth/${AuthAction}`
export interface Dispatch<
  T = {
    store: Store
    storeRef: React.MutableRefObject<Store>
  },
> {
  (actionType: 'user/SET_USER', payload: SetUserArgs): Promise<T>
  (actionType: 'auth/SET_AUTH'): Promise<T>
  (actionType: 'auth/CLEAR_AUTH'): Promise<T>
}
export interface ActionContext<S = State> {
  store: Store
  state: S
  dispatch: Dispatch
}

export type ReducerAction = UserAction | AuthAction
export type Reducer<A extends ReducerAction, S extends State> = Record<
  A,
  (context: ActionContext<S>, payload?: any) => S | Promise<S>
>

export interface StoreInitializerArg {
  user?: any // TODO: Should be User DTO from BE API
  [key: string]: any
}

export type StoreInitializer = (args: StoreInitializerArg) => Store
