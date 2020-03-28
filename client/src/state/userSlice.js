import axios from 'axios'
import { createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({
  name: 'User',
  initialState: { user: null, errors: {}, loading: false },
  reducers: {
    userLoading: state => {
      state.loading = true
    },
    getUserSuccess: (state, { payload }) => {
      state.user = payload
      state.loading = false
      state.errors = {}
    },
    getUserFailure: (state, { payload }) => {
      state.loading = false
      state.errors = payload
    },
  },
})

export const { userLoading, getUserSuccess, getUserFailure } = userSlice.actions
export const userSelector = state => state.user
export default userSlice.reducer

export function fetchUser() {
  return async dispatch => {
    dispatch(userLoading())

    try {
      const res = await axios.get('/api/auth/')
      const user = res.data

      dispatch(getUserSuccess(user))
    } catch (e) {
      dispatch(getUserFailure(e.message))
      // The access / refresh token is no longer valid.
      // This is probably caused by the database being reset
      // and should only happen in testing.
      localStorage.clear('refresh')
      localStorage.clear('access')
      window.location.reload()
    }
  }
}

export function loginUser(user, history) {
  return postUser(user, history, '/api/auth/')
}

export function registerUser(user, history) {
  return postUser(user, history, '/api/users/')
}

// Register or log in a user
function postUser(user, history, route) {
  return async dispatch => {
    dispatch(userLoading())

    try {
      const res = await axios.post(route, user)
      const data = res.data

      localStorage.setItem('access', data.access)
      localStorage.setItem('refresh', data.refresh)

      dispatch(getUserSuccess(data.user))
      history.push('/')
    } catch (e) {
      dispatch(getUserFailure(e.response.data))
    }
  }
}
