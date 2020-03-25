import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const postsSlice = createSlice({
  name: 'posts',
  initialState: {
    posts: [],
    count: 0,
    next: null,
    previous: null,
    errors: '',
    loading: true,
  },
  reducers: {
    postsLoading: state => {
      state.loading = true
    },
    getPostsSuccess: (state, { payload }) => {
      state.posts = payload.results
      state.count = payload.count
      state.next = payload.next
      state.previous = payload.previous
      state.loading = false
      state.errors = ''
    },
    getPostsError: (state, { payload }) => {
      state.loading = false
      state.errors = payload
    },
  },
})

export const {
  getPostsSuccess,
  getPostsError,
  postsLoading,
} = postsSlice.actions
export const postsSelector = state => state.posts
export default postsSlice.reducer

export function getPostsForUser(username) {
  return async dispatch => {
    dispatch(postsLoading())

    try {
      const res = await axios.get(`/api/posts/?username=${username}`)
      const data = res.data

      dispatch(getPostsSuccess(data))
    } catch (err) {
      dispatch(getPostsError(err.message))
    }
  }
}
