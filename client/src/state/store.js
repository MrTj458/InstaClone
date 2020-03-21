import { configureStore } from '@reduxjs/toolkit'

import userSlice from './userSlice'
import profileSlice from './profileSlice'

const store = configureStore({
  reducer: { user: userSlice, profile: profileSlice },
})

export default store
