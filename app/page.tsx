'use client'

import * as React from 'react'
import { NextAppPage } from 'next'
import { Context } from '@/store'

const Home: NextAppPage = () => {
  const { state, dispatch } = React.useContext(Context)

  const [newUserName, setNewUserName] = React.useState(state.user?.name || '')
  const [newUserAge, setNewUserAge] = React.useState(state.user?.age || 0)

  const handleNewUserNameChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setNewUserName(evt.target.value)
  }

  const handleNewUserAgeChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setNewUserAge(Number(evt.target.value))
  }

  const handleUserUpdate = () => {
    dispatch('user/SET_USER', { name: newUserName, age: newUserAge })
  }

  const handleUserClear = () => {
    dispatch('user/CLEAR_USER')
  }

  return (
    <>
      <h1>Hello World. Current user is: {state.user?.name} with age: {state.user?.age}</h1>

      <input type="text" value={newUserName} onChange={handleNewUserNameChange} />
      <input type="number" value={newUserAge} onChange={handleNewUserAgeChange} />

      <div>
        <button onClick={handleUserUpdate}>Update user</button>
        <button onClick={handleUserClear}>Clear user</button>
      </div>
      
    </>
  )
}

export default Home
