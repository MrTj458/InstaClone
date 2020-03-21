import React from 'react'
import AuthForm from '../components/Users/AuthForm'
import styled from 'styled-components'

const Styles = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`

export default function AuthPage({ register = false }) {
  return (
    <Styles>
      <AuthForm register={register} />
    </Styles>
  )
}
