import axios from 'axios'
import { createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({
  name: 'User',
  initialState: { user: null, errors: [], loading: false },
  reducers: {
    getUser: state => {
      state.loading = true
    },
    getUserSuccess: (state, { payload }) => {
      state.user = payload
      state.loading = false
      state.errors = []
    },
    getUserFailure: (state, { payload }) => {
      state.loading = false
      state.errors = payload
    },
  },
})

export const { getUser, getUserSuccess, getUserFailure } = userSlice.actions
export const userSelector = state => state.user
export default userSlice.reducer

export function fetchUser() {
  return async dispatch => {
    dispatch(getUser())

    try {
      const res = await axios.get('/auth/')
      const user = res.data

      dispatch(getUserSuccess(user))
    } catch (e) {
      dispatch(getUserFailure(e.message))
    }
  }
}
