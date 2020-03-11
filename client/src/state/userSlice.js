import { createSlice } from '@reduxjs/toolkit'

const user = createSlice({
  name: 'User',
  initialState: { user: {}, errors: [], loading: false },
  reducers: {
    login: (state, action) => {
      return state.user
    },
  },
})

const { reducer: userReducer } = user

export default userReducer
