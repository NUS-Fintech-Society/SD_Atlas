import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'

export const adminNavbarSlice = createSlice({
  name: 'dashboard',
  initialState: 0,
  reducers: {
    changeIndex: (state, action: PayloadAction<number>) => {
      state = action.payload
      return state
    },
  },
})

export const { changeIndex } = adminNavbarSlice.actions
export default adminNavbarSlice.reducer
export const selectedIndex = (state: RootState) => state.adminNavbar
