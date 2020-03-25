import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'

import Spinner from '../Spinner'
import {
  getPostsForUser,
  postsSelector,
  getPosts,
} from '../../state/postsSlice'
import Post from './Post'

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

export default function Posts({ username }) {
  const dispatch = useDispatch()
  const { posts, error, loading } = useSelector(postsSelector)

  useEffect(() => {
    if (username && username.length) {
      dispatch(getPostsForUser(username))
    } else {
      dispatch(getPosts())
    }
  }, [username, dispatch])

  if (loading) return <Spinner />
  if (error) return <p>{error}</p>

  if (posts.length === 0) {
    return <h2>This user has no posts</h2>
  }

  return (
    <Container>
      {posts.map(post => (
        <Post key={post.id} post={post} />
      ))}
    </Container>
  )
}
