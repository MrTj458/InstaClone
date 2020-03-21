import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { loginUser, userSelector, registerUser } from '../../state/userSlice'
import Spinner from '../Spinner'
import { Button, Input } from '../styles'

const FormControl = styled.div`
  margin-bottom: 20px;
`

const ToggleButton = styled.button`
  display: block;
  margin-top: 20px;
  border: 0;
  background: 0;
  text-decoration: underline;
  width: 100%;
  cursor: pointer;

  :active,
  :focus {
    outline: none;
  }
`

const ErrorText = styled.p`
  color: red;
  text-align: center;
  margin-bottom: 5px;
`

const Title = styled.h1`
  font-family: 'Pacifico', cursive;
  font-size: 48px;
  font-weight: normal;
`

const Text = styled.p`
  color: #999;
  margin-bottom: 30px;
`

const AuthContainer = styled.div`
  border: 1px solid #dbdbdb;
  background-color: #fff;
  border-radius: 2px;
  width: calc(100% - 10px);
  max-width: 400px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px 30px;
  margin: 40px 5px;

  form {
    width: 100%;
  }

  fieldset {
    border: 0;
  }

  small {
    color: red;
  }
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
  }, [registering])

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
    <AuthContainer>
      <Title>Instaclone</Title>
      <Text>Check out pics and stuff.</Text>
      <form onSubmit={handleSubmit}>
        {errors.authentication && (
          <ErrorText>{errors.authentication[0]}</ErrorText>
        )}
        <fieldset disabled={loading}>
          <FormControl>
            <Input
              ref={inputRef}
              type="text"
              name="username"
              value={user.username}
              onChange={handleChange}
              placeholder="Username"
              error={!!errors.username}
            />
            {errors.username && <small>{errors.username[0]}</small>}
          </FormControl>
          {registering && (
            <FormControl>
              <Input
                type="text"
                name="email"
                value={user.email}
                onChange={handleChange}
                placeholder="Email"
                error={!!errors.email}
              />
              {errors.email && <small>{errors.email[0]}</small>}
            </FormControl>
          )}
          <FormControl>
            <Input
              type="password"
              name="password"
              onChange={handleChange}
              value={user.password}
              placeholder="Password"
              error={!!errors.password}
            />
            {errors.password && <small>{errors.password[0]}</small>}
          </FormControl>
          {registering && (
            <FormControl>
              <Input
                type="password"
                name="password2"
                value={user.password2}
                onChange={handleChange}
                placeholder="Confirm Password"
                error={user.password !== user.password2}
              />
              {user.password !== user.password2 && (
                <small>Passwords do not match.</small>
              )}
            </FormControl>
          )}
          <Button fill="true" type="submit">
            {loading ? (
              <Spinner color="#fff" />
            ) : registering ? (
              'Register'
            ) : (
              'Log In'
            )}
          </Button>
          <ToggleButton
            type="button"
            onClick={() => setRegistering(!registering)}
          >
            {registering
              ? 'Already have an account? Log In'
              : 'Need an account? Register'}
          </ToggleButton>
        </fieldset>
      </form>
    </AuthContainer>
  )
}
