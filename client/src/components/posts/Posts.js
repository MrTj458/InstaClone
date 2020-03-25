import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'

import { GhostButton } from '../styles'
import Spinner from '../Spinner'
import {
  getPostsForUser,
  postsSelector,
  getPosts,
} from '../../state/postsSlice'
import ListPost from './ListPost'
import GridPost from './GridPost'

const Container = styled.div``

const Options = styled.div`
  width: 100%;
  justify-content: center;
  display: flex;
  margin-bottom: 15px;

  button {
    margin-right: 15px;
  }
`

const StyleButton = styled(GhostButton)`
  border-radius: 0;
  padding-bottom: 5px;
  border-bottom: ${props => (props.selected ? '2px solid #000' : 'none')};
`

const ListContainer = styled.div`
  margin-top: 15px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const GridContainer = styled.div`
  margin-top: 15px;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;

  @media (max-width: 700px) {
    gap: 0;
  }
`

export default function Posts({ username, initialStyle = 'list' }) {
  const dispatch = useDispatch()
  const { posts, error, loading } = useSelector(postsSelector)

  const [style, setStyle] = useState(initialStyle)

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
      <Options>
        <StyleButton
          selected={style === 'list'}
          onClick={() => setStyle('list')}
        >
          <i className="fas fa-list-ul fa-2x"></i>
        </StyleButton>
        <StyleButton
          selected={style === 'grid'}
          onClick={() => setStyle('grid')}
        >
          <i className="fas fa-border-all fa-2x"></i>
        </StyleButton>
      </Options>

      {style === 'list' ? (
        <ListContainer>
          {posts.map(post => (
            <ListPost key={post.id} post={post} />
          ))}
        </ListContainer>
      ) : (
        <GridContainer>
          {posts.map(post => (
            <GridPost key={post.id} post={post} />
          ))}
        </GridContainer>
      )}
    </Container>
  )
}
