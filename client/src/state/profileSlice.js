import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const profileSlice = createSlice({
  name: 'profile',
  initialState: { user: null, errors: '', loading: true },
  reducers: {
    profileLoading: state => {
      state.loading = true
    },
    getProfileSuccess: (state, { payload }) => {
      state.user = payload
      state.loading = false
      state.errors = {}
    },
    getProfileError: (state, { payload }) => {
      state.loading = false
      state.errors = payload
    },
  },
})

export const {
  profileLoading,
  getProfileError,
  getProfileSuccess,
} = profileSlice.actions
export const profileSelector = state => state.profile
export default profileSlice.reducer

export function fetchProfile(username) {
  return async dispatch => {
    dispatch(profileLoading())

    try {
      const res = await axios.get(`/api/users/${username}`)
      const data = res.data

      dispatch(getProfileSuccess(data))
    } catch (e) {
      dispatch(getProfileError(e.message))
    }
  }
}
