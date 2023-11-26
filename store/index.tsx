/*
 * Copyright (c) 2023 LY Corporation. All rights reserved.
 * LY Corporation PROPRIETARY/CONFIDENTIAL. Use is subject to license terms.
 */
'use client'
import * as React from 'react'
import type {
  Store,
  Dispatch,
  StoreInitializerArg,
  StoreInitializer,
} from './_types'
import { useTypedReducer } from '@/hooks'
import { UserState } from './user.store'
import { AuthState } from './auth.store'
import { Privilege } from '@/types/enum'

export const Context = React.createContext<{
  store: Store
  dispatch: Dispatch
}>(null as any)

const storeInitializer: StoreInitializer = (args) => ({
  user: new UserState(args),
  auth: new AuthState(),
})

interface Props {
  children: React.ReactNode
}

export const StoreProvider: React.FC<Props> = ({ children }) => {
  // TODO: Call BE API here to get the user DTO
  const dummyUser = {
    name: 'John',
    accountName: 'LINE',
    privilege: Privilege.Admin,
  }

  const storeInitializerArg: StoreInitializerArg = {
    user: dummyUser,
  }

  storeInitializerArg.user = dummyUser

  const [store, dispatch] = useTypedReducer(
    storeInitializerArg,
    storeInitializer
  )

  return (
    <Context.Provider value={{ store, dispatch }}>{children}</Context.Provider>
  )
}

export * from './_types'
