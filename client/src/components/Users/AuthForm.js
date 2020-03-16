import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { loginUser, userSelector, registerUser } from '../../state/userSlice'

const Input = styled.input`
  display: block;
`

const Button = styled.button`
  display: block;
`

export default function AuthForm({ register }) {
  const dispatch = useDispatch()
  const history = useHistory()
  const { errors, loading } = useSelector(userSelector)
  const inputRef = useRef(null)

  const [registering, setRegistering] = useState(register)
  const [user, setUser] = useState({
    username: '',
    email: '',
    password: '',
    password2: '',
  })

  useEffect(() => {
    inputRef.current.focus()
  }, [])

  const handleSubmit = e => {
    e.preventDefault()
    if (registering) {
      if (user.password === user.password2) {
        dispatch(registerUser(user, history))
      }
    } else {
      dispatch(loginUser(user, history))
    }
  }

  const handleChange = e => {
    setUser({ ...user, [e.target.name]: e.target.value })
  }

  return (
    <>
      <h1>{registering ? 'Register' : 'Login'}</h1>
      {errors.authentication && <p>{errors.authentication[0]}</p>}
      <form onSubmit={handleSubmit}>
        <fieldset disabled={loading}>
          <Input
            ref={inputRef}
            type="text"
            name="username"
            value={user.username}
            onChange={handleChange}
            placeholder="Username"
          />
          {errors.username && <small>{errors.username[0]}</small>}
          {registering && (
            <>
              <Input
                type="text"
                name="email"
                value={user.email}
                onChange={handleChange}
                placeholder="Email"
              />
              {errors.email && <small>{errors.email[0]}</small>}
            </>
          )}
          <Input
            type="password"
            name="password"
            onChange={handleChange}
            value={user.password}
            placeholder="password"
          />
          {errors.password && <small>{errors.password[0]}</small>}
          {registering && (
            <>
              <Input
                type="password"
                name="password2"
                value={user.password2}
                onChange={handleChange}
                placeholder="Confirm Password"
              />
              {user.password !== user.password2 && (
                <small>Passwords do not match.</small>
              )}
            </>
          )}
          <Button type="submit">{register ? 'Register' : 'Login'}</Button>
          <Button type="button" onClick={() => setRegistering(!registering)}>
            {registering
              ? 'Already have an account? Login'
              : 'Need an account? Register'}
          </Button>
        </fieldset>
      </form>
    </>
  )
}
