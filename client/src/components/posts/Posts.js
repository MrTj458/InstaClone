import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Spinner from '../Spinner'
import { getPostsForUser, postsSelector } from '../../state/postsSlice'
import Post from './Post'

export default function Posts({ username }) {
  const dispatch = useDispatch()
  const { posts, error, loading } = useSelector(postsSelector)

  useEffect(() => {
    if (username) {
      dispatch(getPostsForUser(username))
    }
  }, [username, dispatch])

  if (loading) return <Spinner />
  if (error) return <p>{error}</p>

  if (posts.length === 0) {
    return <h2>This user has no posts</h2>
  }

  return (
    <div>
      {posts.map(post => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  )
}
