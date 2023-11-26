'use client'

import * as React from 'react'
import type { State, Dispatch, StateInitializerArg } from './types'
import useTypedReducer from './use-typed-reducer'
import { UserState } from './user.store'

export const Context = React.createContext<{ state: State, dispatch: Dispatch }>(null as any)

const stateInitializer = (args: StateInitializerArg): State => ({
  user: new UserState(args)
})

interface Props {
  stateInitializerArg?: StateInitializerArg
  children: React.ReactNode
}

export const StoreProvider: React.FC<Props> = ({ stateInitializerArg = {}, children }) => {
  const [state, dispatch] = useTypedReducer<StateInitializerArg>(stateInitializerArg, stateInitializer)

  return (
    <Context.Provider value={{ state, dispatch }}>
      {children}
    </Context.Provider>
  )
}

export * from './types'
