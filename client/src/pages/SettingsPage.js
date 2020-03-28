import React from 'react'
import { useHistory } from 'react-router-dom'

import { Button } from '../components/styles'

export default function SettingsPage() {
  const history = useHistory()

  const logout = () => {
    localStorage.removeItem('refresh')
    localStorage.removeItem('access')
    history.push('/')
    window.location.reload()
  }

  return (
    <>
      <h1>Settings</h1>
      <Button onClick={logout}>Log out</Button>
    </>
  )
}
