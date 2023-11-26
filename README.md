(需要看的檔案在 `store/*` 與 `app/page.tsx` 下)

# 介紹
這裡主要是 Demo 使用 React 原生 context API 以及 useReducer 去建立一個輕量的 global state management 系統。
使用方式如下:

```tsx
import * as React from 'react'
import { Context } from '@/store'

const Component: React.FC = () => {
  const { state, dispatch } = React.useContext(Context)

  const handleUserClear = () => {
    dispatch('user/CLEAR_USER')
  }

  return (
    <>
      <h1>
        State: {JSON.stringify(state)}
      </h1>

      <button onClick={handleUserClear}>Clear user</button>
    </>
  )
}
```

其中有兩個亮點

## 1. dispatch 自動提示與型別檢查
藉由在 React 原生的 Dispatch 外面再包一層工廠函數，做到在呼叫 dispatch 時，第一個參數 action type 可以有下拉選單。
並且第二個參數會自動根據第一個參數的不同去做型別檢查
詳細 Demo 見 `app/page.tsx`
```tsx
dispatch('user/CLEAR_USER') // 自動提示第一個有兩個 action: 'user/SET_USER' 與 'user/CLEAR_USER'

dispatch('user/SET_USER') // ❌ 報錯，因為 'user/SET_USER' 需要傳入 `{ name: string, age: number }` 做為第二參數
dispatch('user/SET_USER', { name: 'John', age: 30 }) // ✅ Correct
```

## 2. 即使 action 為非同步，其拿到的 state 也永遠是最新的
原生的 useReducer 無法支援非同步 action。即:

```ts
dispatch('async task') // 非同步工作。呼叫當下，傳入的 global state 為 v1
dispatch('sync task') // 同步工作。呼叫當下，傳入的 global state 為 v1

// ...0.1 秒後，state 被 sync task 更新成 v2
// ...10 秒後，async task resolved。但其拿到的 state 還是傳入當下的 v1
```

為了解決這個問題，在 `store/use-type-reducer.ts > useTypedReducer` 以及 `store/use-type-reducer.ts > dispatchFactory` 中
利用了 useRef 存儲每次最新版的 state。並且 Object.getter API，使 action 中獲取 state 時背後都是呼叫 `() => stateRef.current`，
讓非同步 action 也能隨時拿到最新版本的 state
