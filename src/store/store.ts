import { configureStore } from '@reduxjs/toolkit'
import adminNavbarReducer from './admin/navbar'
import dashboardReducer from './admin/dashboard'

const store = configureStore({
  reducer: {
    adminNavbar: adminNavbarReducer,
    dashboard: dashboardReducer,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
export default store
