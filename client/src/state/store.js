import { configureStore } from '@reduxjs/toolkit'

import userSlice from './userSlice'
import profileSlice from './profileSlice'
import postsSlice from './postsSlice'
import postSlice from './postSlice'

const store = configureStore({
  reducer: {
    user: userSlice,
    profile: profileSlice,
    posts: postsSlice,
    post: postSlice,
  },
})

export default store
