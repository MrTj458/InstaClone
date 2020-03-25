import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const postSlice = createSlice({
  name: 'posts',
  initialState: { post: {}, errors: {}, loading: false },
  reducers: {
    postLoading: state => {
      state.loading = true
    },
    getPostSuccess: (state, { payload }) => {
      state.post = payload
      state.loading = false
      state.errors = {}
    },
    getPostError: (state, { payload }) => {
      state.loading = false
      state.errors = payload
    },
  },
})

export const { getPostSuccess, getPostError, postLoading } = postSlice.actions
export const postSelector = state => state.post
export default postSlice.reducer

export function createPost(formData, history) {
  return async dispatch => {
    dispatch(postLoading())

    try {
      const res = await axios.post('/api/posts/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      const data = res.data

      dispatch(getPostSuccess(data))
      history.push('/')
    } catch (err) {
      dispatch(getPostError(err.response.data))
    }
  }
}
