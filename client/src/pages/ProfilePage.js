import React, { useEffect } from 'react'
import styled from 'styled-components'
import { useRouteMatch, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { fetchProfile, profileSelector } from '../state/profileSlice'
import NotFound from './404'
import Spinner from '../components/Spinner'
import Posts from '../components/posts/Posts'
import { userSelector } from '../state/userSlice'

const ProfileContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 150px;
    height: 150px;
    margin-right: 30px;
    border-radius: 50%;
  }
`

const ProfileUser = styled.div`
  display: flex;
  margin-bottom: 15px;

  h1 {
    margin-right: 20px;
  }
`

const ProfileStats = styled.div`
  display: flex;
  text-align: center;

  p {
    margin-right: 15px;
    font-size: 18px;
  }

  span {
    font-weight: bold;
  }
`

export default function ProfilePage() {
  const dispatch = useDispatch()
  const { params } = useRouteMatch()
  const { user, errors, loading } = useSelector(profileSelector)
  const { user: authUser } = useSelector(userSelector)

  useEffect(() => {
    dispatch(fetchProfile(params.username))
  }, [params.username, dispatch])

  // User not found
  if (errors.length > 0) {
    return <NotFound />
  }

  if (loading) {
    return <Spinner />
  }

  return (
    <>
      <ProfileContainer>
        <img src={user.profile.image} alt={user.username} />

        <div>
          <ProfileUser>
            <h1>{user.username}</h1>
            {user.id === authUser.id && (
              <Link style={{ color: '#000' }} to="/settings">
                <i class="fas fa-cog fa-2x"></i>
              </Link>
            )}
          </ProfileUser>
          <ProfileStats>
            <p>
              <span>{user.num_posts}</span>{' '}
              {user.num_posts === 1 ? 'post' : 'posts'}
            </p>
            <p>
              <span>0</span> followers
            </p>
            <p>
              <span>0</span> following
            </p>
          </ProfileStats>
        </div>
      </ProfileContainer>
      <Posts username={params.username} initialStyle="grid" />
    </>
  )
}
