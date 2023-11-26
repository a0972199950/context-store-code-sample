/*
 * Copyright (c) 2023 LY Corporation. All rights reserved.
 * LY Corporation PROPRIETARY/CONFIDENTIAL. Use is subject to license terms.
 */
import type { Reducer } from './_types'

export type AuthAction = 'SET_AUTH' | 'CLEAR_AUTH'

export class AuthState {
  public isAuth: boolean = false
}

export const authReducer: Reducer<AuthAction, AuthState> = {
  async ['SET_AUTH']({ state }) {
    const isAuth = state.isAuth
    if (!isAuth) {
      try {
        // Wait for BE
        const me: object | null = (await fetch('_api/profile')) as any
        if (me) {
          return {
            ...state,
            ...me,
            isAuth: true,
          }
        }
      } catch (err) {
        console.error(err)
      }
    }

    return { ...state }
  },

  ['CLEAR_AUTH']() {
    return {
      isAuth: false,
    }
  },
}
