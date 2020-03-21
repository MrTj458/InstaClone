import React from 'react'
import styled, { keyframes } from 'styled-components'
import { Link } from 'react-router-dom'

const wiggle = keyframes`
  0% {
    transform: translateX(-5px);
  }
  50% {
    transform: translateX(5px);
  }
  100% {
    transform: translateX(-5px);
  }
`

const NotFoundContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  h1 {
    font-family: 'Pacifico', cursive;
    font-size: 56px;
  }

  h2 {
    font-family: 'Pacifico', cursive;
    font-size: 28px;
  }

  p {
    margin-bottom: 10px;
    font-size: 18px;
  }

  h3 {
    font-family: 'Pacifico', cursive;
    font-size: 24px;
    margin-left: 15px;

    :hover {
      text-decoration: underline;
    }
  }
`

const BackLink = styled(Link)`
  text-decoration: none;
  color: #3897f0;
  display: flex;
  align-items: center;

  i {
    animation: ${wiggle} 1s linear infinite;
  }
`

export default function NotFound() {
  return (
    <NotFoundContainer>
      <h1>404</h1>
      <h2>Oh No!</h2>
      <p>We could not find the page you are looking for.</p>
      <BackLink style={{ textDecoration: 'none' }} to="/">
        <i className="fas fa-angle-double-left fa-2x"></i>
        <h3>Take me home!</h3>
      </BackLink>
    </NotFoundContainer>
  )
}
