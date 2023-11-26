import { UserState, UserActionType, SetUserArgs } from './user.store'

export interface State {
  user: UserState | null
}

export type ActionType = UserActionType

export interface StoreContext {
  state: State
  dispatch: Dispatch
}

export type Reducer<PartialActionType extends Partial<ActionType>> = Record<PartialActionType, (context: StoreContext, payload?: any) => State | Promise<State>>

export interface StateInitializerArg {
  [key: string]: any
}

export interface Dispatch {
  (actionType: 'user/SET_USER', payload: SetUserArgs): Promise<void>
  (actionType: 'user/CLEAR_USER'): Promise<void>
}
