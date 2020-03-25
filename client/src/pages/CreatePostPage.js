import React from 'react'
import styled from 'styled-components'

import PostForm from '../components/posts/PostForm'

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`

export default function CreatePostPage() {
  return (
    <Container>
      <PostForm />
    </Container>
  )
}
