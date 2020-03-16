import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { fetchUser, userSelector } from '../state/userSlice'

export default function FetchUser({ children }) {
  const dispatch = useDispatch()
  const { user } = useSelector(userSelector)

  useEffect(() => {
    if (user === null) {
      dispatch(fetchUser())
    }
  }, [dispatch, user])

  if (user === null) {
    return <h1>Loading...</h1>
  }

  return children
}
