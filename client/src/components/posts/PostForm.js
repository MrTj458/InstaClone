import React, { useRef, useState } from 'react'
import styled from 'styled-components'

import { useDispatch } from 'react-redux'
import { postSelector, createPost } from '../../state/postSlice'
import { useHistory } from 'react-router-dom'

import { Button, FormControl } from '../styles'

const Container = styled.div`
  fieldset {
    border: 0;
  }
`

export default function PostForm() {
  const history = useHistory()
  const dispatch = useDispatch(postSelector)
  const [description, setDescription] = useState('')
  const fileRef = useRef(null)

  const handleSubmit = e => {
    e.preventDefault()
    const formData = new FormData()

    formData.append('description', description)
    formData.append('image', fileRef.current.files[0])

    dispatch(createPost(formData, history))
  }

  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <fieldset>
          <FormControl>
            <textarea
              name="description"
              placeholder="description"
              value={description}
              onChange={e => setDescription(e.target.value)}
            />
          </FormControl>
          <FormControl>
            <input ref={fileRef} type="file" />
          </FormControl>
          <Button>Post</Button>
        </fieldset>
      </form>
    </Container>
  )
}
