import React from 'react'
import styled, { keyframes } from 'styled-components'

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`

const Circle = styled.div`
  border: 3px solid ${props => (props.color ? props.color : '#000')};
  border-radius: 50%;
  border-top: 3px solid transparent;
  width: ${props => (props.large ? '40px' : '20px')};
  height: ${props => (props.large ? '40px' : '20px')};
  animation: ${rotate} 0.5s linear infinite;
`

const SpinnerContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`

export default function Spinner({ color, large }) {
  return (
    <SpinnerContainer>
      <Circle color={color} large={large} />
    </SpinnerContainer>
  )
}
