import type { StateInitializerArg, Reducer } from './types'

export class UserState {
  name: string = ''
  age: number | null = null

  constructor (_args: StateInitializerArg) {
    // Init user state with args
  }
}

export type UserActionType = 'user/SET_USER' | 'user/CLEAR_USER'

export interface SetUserArgs {
  name: string
  age: number
}

export const userReducer: Reducer<UserActionType> = {
  ['user/SET_USER'] (context, payload: SetUserArgs) {
    return {
      ...context.state,
      user: payload
    }
  },

  async ['user/CLEAR_USER'] (context) {
    return {
      ...context.state,
      user: null
    }
  }
}
