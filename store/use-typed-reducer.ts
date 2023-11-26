/*
 * Copyright (c) 2023 LY Corporation. All rights reserved.
 * LY Corporation PROPRIETARY/CONFIDENTIAL. Use is subject to license terms.
 */
// [Credit]: https://stackoverflow.com/questions/53146795/react-usereducer-async-data-fetch

import * as React from 'react'
import { userReducer } from './user.store'
import { authReducer } from './auth.store'
import type {
  StoreModuleKeys,
  ReducerAction,
  DispatchAction,
  Store,
  Dispatch,
  ActionContext,
} from './_types'

const reducerHandlers = {
  user: userReducer,
  auth: authReducer,
}

const dispatchFactory = (
  coreDispatch: React.Dispatch<React.SetStateAction<Store>>,
  storeRef: React.MutableRefObject<Store>
) => {
  const dispatch: Dispatch = async (
    actionType: DispatchAction,
    payload?: any
  ) => {
    const [storeModuleKey, storeModuleAction] = actionType.split('/') as [
      StoreModuleKeys,
      ReducerAction,
    ]
    const handler = (reducerHandlers[storeModuleKey] as any)[storeModuleAction]

    try {
      if (!handler) {
        throw new Error(
          `Cannot find correspond reducer handler for action type: ${actionType}. Please make sure you already define it`
        )
      }

      if (!storeModuleKey) {
        throw new Error(
          `Got invalid action type: ${actionType}. Please make sure it follows the format: <store-module-key>/<action-type>`
        )
      }

      const context: ActionContext = {
        get store() {
          return storeRef.current
        },
        get state() {
          return storeRef.current[storeModuleKey]
        },
        dispatch,
      }

      const newModuleState = await handler(context, payload)

      coreDispatch(() => {
        return (storeRef.current = {
          ...storeRef.current,
          [storeModuleKey]: newModuleState,
        })
      })
    } catch (e) {
      console.error(e)
    }

    return {
      store: storeRef.current,
      storeRef,
    }
  }

  return dispatch
}

const useTypedReducer = <StateInitializerArg>(
  stateInitializerArg: StateInitializerArg,
  stateInitializer: (args: StateInitializerArg) => Store
): [Store, Dispatch] => {
  const [store, coreDispatch] = React.useState(
    stateInitializer(stateInitializerArg)
  )
  const storeRef = React.useRef(store)
  const dispatch: Dispatch = React.useMemo(
    () => dispatchFactory(coreDispatch, storeRef),
    [coreDispatch]
  )
  return [store, dispatch]
}

export default useTypedReducer
