import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const Container = styled(Link)`
  cursor: pointer;

  img {
    width: 100%;
  }
`

export default function GridPost({ post }) {
  return (
    <Container to={`/${post.author.username}`}>
      <img src={post.image} alt="Post" />
    </Container>
  )
}
