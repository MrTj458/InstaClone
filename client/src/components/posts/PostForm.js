import React, { useRef, useState } from 'react'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'

import { postSelector, createPost } from '../../state/postSlice'
import { useHistory } from 'react-router-dom'
import { Button, FormControl } from '../styles'
import Spinner from '../Spinner'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: calc(100% - 10px);
  max-width: 500px;
  padding: 20px 30px;

  border: 1px solid #dbdbdb;
  border-radius: 2px;
  background-color: #fff;

  fieldset {
    border: 0;
  }

  form {
    width: 100%;
  }

  h1 {
    font-family: 'Pacifico', cursive;
    margin-bottom: 20px;
  }

  small {
    color: red;
  }
`

const FileInput = styled.input`
  display: none;
`

const TextArea = styled.textarea`
  width: 100%;
  resize: vertical;
  border: 1px solid ${props => (props.error ? 'red' : '#dbdbdb')};
  background-color: #f2f2f2;
  border-radius: 4px;
  font-size: 14px;
`

const DropBox = styled.label`
  padding: 0;
  display: block;
  position: relative;
  border: 1px solid ${props => (props.error ? 'red' : '#dbdbdb')};
  background-color: #f2f2f2;
  border-radius: 4px;
  width: 100%;
  min-height: 200px;
  cursor: pointer;

  :hover {
    background-color: rgba(0, 0, 0, 0.2);
  }

  span {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    text-align: center;
  }
`

const PreviewImage = styled.img`
  border-radius: 4px;
  width: 100%;
  height: 100%;
  object-fit: cover;
`

export default function PostForm() {
  const history = useHistory()
  const dispatch = useDispatch()
  const { errors, loading } = useSelector(postSelector)

  const [filePreview, setFilePreview] = useState()
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
      <h1>Create a Post</h1>
      <form onSubmit={handleSubmit}>
        <fieldset disabled={loading}>
          <FormControl>
            <FileInput
              ref={fileRef}
              type="file"
              accept="image/png, image/jpeg"
              id="file"
              onChange={e =>
                setFilePreview(URL.createObjectURL(e.target.files[0]))
              }
            />
            <DropBox htmlFor="file" error={!!errors.image}>
              <span>{!filePreview && 'Click to select an image.'}</span>
              <PreviewImage src={filePreview} alt="" />
            </DropBox>
            {errors.image && <small>{errors.image[0]}</small>}
          </FormControl>

          <FormControl>
            <TextArea
              name="description"
              rows="10"
              placeholder="Description"
              value={description}
              onChange={e => setDescription(e.target.value)}
              error={!!errors.description}
            />
            {errors.description && <small>{errors.description[0]}</small>}
          </FormControl>

          <Button fill="true">{loading ? <Spinner /> : 'Post'}</Button>
        </fieldset>
      </form>
    </Container>
  )
}
