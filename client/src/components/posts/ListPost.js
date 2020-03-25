import React from 'react'
import styled from 'styled-components'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import moment from 'moment'

import { userSelector } from '../../state/userSlice'
import { GhostButton } from '../styles'

const Container = styled.div`
  width: calc(100% - 10px);
  max-width: 600px;

  border: 1px solid #dbdbdb;
  border-radius: 2px;
  background-color: #fff;
  margin-bottom: 30px;
`

const AuthorSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 15px;
  border-bottom: 1px solid #dbdbdb;

  img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin-right: 15px;
    border: 1px solid #dbdbdb;
  }
`

const Author = styled(Link)`
  display: flex;
  align-items: center;
  color: #000;
  text-decoration: none;
  font-size: 18px;
`

const Image = styled.img`
  width: 100%;
  border-bottom: 1px solid #dbdbdb;
`

const Actions = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 15px;
  border-bottom: 1px solid #dbdbdb;
`

const Likes = styled.div`
  display: flex;
  align-items: center;
`

const LikeButton = styled(GhostButton)`
  margin-right: 15px;
`

const Description = styled.div`
  padding: 10px 15px;
  /* font-size: 24px; */
`

const Comments = styled.div``

export default function ListPost({ post }) {
  const { user } = useSelector(userSelector)

  const liked = post.likes.includes(user.id)

  return (
    <Container>
      <AuthorSection>
        <Author to={`/${post.author.username}`}>
          <img src={post.author.profile.image} alt="" />
          <p>{post.author.username}</p>
        </Author>
        <GhostButton>
          <i className="fas fa-ellipsis-h"></i>
        </GhostButton>
      </AuthorSection>
      <Image src={post.image} />
      <Actions>
        <Likes>
          <LikeButton>
            {liked ? (
              <i style={{ color: 'red' }} className="fas fa-heart fa-2x"></i>
            ) : (
              <i className="far fa-heart fa-2x"></i>
            )}
          </LikeButton>
          <p>{post.likes.length}</p>
        </Likes>
        <div>
          <p>Posted {moment(post.created_at).fromNow()}.</p>
        </div>
      </Actions>
      {post.description && (
        <Description>
          <p>{post.description}</p>
        </Description>
      )}
      <Comments></Comments>
    </Container>
  )
}
