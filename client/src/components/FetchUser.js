import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'

import { fetchUser, userSelector } from '../state/userSlice'
import Spinner from './Spinner'

const LoadingScreen = styled.div`
  width: 100vw;
  height: 66vh;
`

export default function FetchUser({ children }) {
  const dispatch = useDispatch()
  const { user } = useSelector(userSelector)

  useEffect(() => {
    if (user === null) {
      dispatch(fetchUser())
    }
  }, [dispatch, user])

  if (user === null) {
    return (
      <LoadingScreen>
        <Spinner large />
      </LoadingScreen>
    )
  }

  return children
}
