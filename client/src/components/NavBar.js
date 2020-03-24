import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { userSelector } from '../state/userSlice'
import { Button } from './styles'

const NavContainer = styled.div`
  background-color: #fff;
  width: 100%;
  border-bottom: solid 1px #dbdbdb;
  padding: 10px 15px;
  display: flex;
  justify-content: center;
  align-items: center;
`

const NavContent = styled.div`
  width: 100%;
  max-width: 900px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const NavBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

const Title = styled.h1`
  font-size: 36px;
  font-family: 'Pacifico', cursive;
  color: #000;
`

const NavLink = styled(Link)`
  text-decoration: none;
  color: #000;
`

const NavButton = styled(Button)`
  margin-left: 10px;
`

const Avatar = styled.img`
  display: block;
  height: 40px;
  width: 40px;
  border-radius: 50%;
  border: 1px solid #dbdbdb;
  margin-left: 10px;
`

export default function NavBar() {
  const { user } = useSelector(userSelector)

  return (
    <NavContainer>
      <NavContent>
        {/* Left Nav */}
        <NavBox>
          <NavLink to="/">
            <Title>Instaclone</Title>
          </NavLink>
        </NavBox>

        {/* Right Nav */}
        <NavBox>
          <NavLink to="/">
            <i className="fas fa-home fa-2x"></i>
          </NavLink>
          {user.id ? (
            // Logged in links
            <>
              <NavLink style={{ marginLeft: '10px' }} to="/new">
                <i className="fas fa-plus fa-2x"></i>
              </NavLink>
              <NavLink to={`/${user.username}`}>
                <Avatar src={user.profile.image} alt="Profile" />
              </NavLink>
            </>
          ) : (
            // Anonymous links
            <NavLink to="/login">
              <NavButton>Log In</NavButton>
            </NavLink>
          )}
        </NavBox>
      </NavContent>
    </NavContainer>
  )
}
