import React, { useEffect } from 'react'
import { useRouteMatch } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { fetchProfile, profileSelector } from '../state/profileSlice'
import NotFound from './404'
import Spinner from '../components/Spinner'

export default function ProfilePage() {
  const dispatch = useDispatch()
  const { params } = useRouteMatch()
  const { user, errors, loading } = useSelector(profileSelector)

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
      <h1>Profile for {user.username}</h1>
      <img src={user.profile.image} alt="Avatar" />
    </>
  )
}
