import React, { useState, useEffect, useRef } from 'react'

import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { loginUser, userSelector } from '../state/userSlice'

export default function Login() {
  const dispatch = useDispatch()
  const history = useHistory()
  const { errors, loading } = useSelector(userSelector)
  const inputRef = useRef(null)

  const [user, setUser] = useState({ username: '', password: '' })

  useEffect(() => {
    inputRef.current.focus()
  }, [])

  const handleSubmit = e => {
    e.preventDefault()
    dispatch(loginUser(user, history))
  }

  const handleChange = e => {
    setUser({ ...user, [e.target.name]: e.target.value })
  }

  return (
    <>
      <h1>Login</h1>
      {errors.authentication && <p>{errors.authentication[0]}</p>}
      <form onSubmit={handleSubmit}>
        <fieldset disabled={loading}>
          <input
            ref={inputRef}
            type="text"
            name="username"
            value={user.username}
            onChange={handleChange}
            placeholder="username"
          />
          {errors.username && <p>{errors.username[0]}</p>}
          <input
            type="password"
            name="password"
            onChange={handleChange}
            value={user.password}
            placeholder="password"
          />
          {errors.password && <p>{errors.password[0]}</p>}
          <button>Login</button>
        </fieldset>
      </form>
    </>
  )
}
