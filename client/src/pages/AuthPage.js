import React from 'react'
import AuthForm from '../components/Users/AuthForm'

export default function AuthPage({ register = false }) {
  return (
    <>
      <AuthForm register={register} />
    </>
  )
}
