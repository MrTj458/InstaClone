import React from 'react'
import { useSelector } from 'react-redux'
import { userSelector } from '../state/userSlice'

import styled from 'styled-components'

const Header = styled.div`
  font-size: 40px;
  font-weight: bold;
  text-decoration: underline;
  border: 1px solid red;
  width: 100%;
`

export default function Home() {
  const { user } = useSelector(userSelector)

  return (
    <>
      <Header>Home Page!</Header>
      <p>Welcome {user.username}</p>
    </>
  )
}
