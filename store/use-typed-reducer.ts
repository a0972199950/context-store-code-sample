// [Credit]: https://stackoverflow.com/questions/53146795/react-usereducer-async-data-fetch

import * as React from 'react'
import { userReducer } from './user.store'
import type { ActionType, State, Dispatch, StoreContext } from './types'

const reducerHandlers = {
  ...userReducer
}

const dispatchFactory = (coreDispatch: React.Dispatch<State>, stateRef: React.MutableRefObject<State>) => {
  const dispatch: Dispatch = async (actionType: ActionType, payload?: any) => {
    const handler = reducerHandlers[actionType]
    let newState: State

    // 為了使 handler 內可以直接 access state，無須還要 stateRef.current
    const context: StoreContext = {
      get state() {
        return stateRef.current
      },

      dispatch,
    }

    try {
      if (!handler) {
        throw new Error(`Cannot find correspond reducer handler for action type: ${actionType}. Please make sure you already define it`)
      }
      
      newState = await handler(context, payload)
    } catch (e) {
      newState = context.state
    }
    
    stateRef.current = newState
    return coreDispatch(newState)
  }

  return dispatch
}

const reducer: React.Reducer<State, State> = (_state: State, newState: State): State => newState

const useTypedReducer = <StateInitializerArg>(
  stateInitializerArg: StateInitializerArg,
  stateInitializer: (args: StateInitializerArg) => State
): [State, Dispatch] => {
  const [state, coreDispatch] = React.useReducer(reducer, stateInitializerArg, stateInitializer)
  // useRef 用來指向最新的 state
  const stateRef = React.useRef(state)

  const dispatch: Dispatch = React.useMemo(
    () => dispatchFactory(coreDispatch, stateRef),
    [dispatchFactory, coreDispatch]
  )

  return [state, dispatch]
}

export default useTypedReducer
