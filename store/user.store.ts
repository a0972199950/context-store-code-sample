/*
 * Copyright (c) 2023 LY Corporation. All rights reserved.
 * LY Corporation PROPRIETARY/CONFIDENTIAL. Use is subject to license terms.
 */
import type { StoreInitializerArg, Reducer } from './_types'
import { Privilege } from '@/types/enum'

export class UserState {
  name: string = ''
  accountName: string = ''
  privilege!: Privilege

  constructor(_args: StoreInitializerArg) {
    this.name = _args.user?.name
    this.accountName = _args.user?.accountName
    this.privilege = _args.user?.privilege
  }
}

export type UserAction = 'SET_USER'

export interface SetUserArgs {
  name: string
  age: number
}

export const userReducer: Reducer<UserAction, UserState> = {
  ['SET_USER']({ state }, payload: SetUserArgs) {
    return { ...state, ...payload }
  },
}
